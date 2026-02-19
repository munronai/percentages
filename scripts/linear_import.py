import os
import re
import sys
import json
import requests
import argparse

# Constants
LINEAR_API_URL = "https://api.linear.app/graphql"

def get_headers(api_key):
    return {
        "Content-Type": "application/json",
        "Authorization": api_key
    }

def run_query(query, variables, api_key):
    response = requests.post(
        LINEAR_API_URL,
        json={"query": query, "variables": variables},
        headers=get_headers(api_key)
    )
    if response.status_code != 200:
        raise Exception(f"Query failed with status code {response.status_code}: {response.text}")

    data = response.json()
    if "errors" in data:
        raise Exception(f"GraphQL errors: {data['errors']}")

    return data["data"]

def get_teams(api_key):
    query = """
    query {
        teams {
            nodes {
                id
                name
                key
            }
        }
    }
    """
    data = run_query(query, {}, api_key)
    return data["teams"]["nodes"]

def create_project(team_id, title, description, state, api_key):
    # Map state to Linear project state if needed, or just use default
    # Linear Project states: planned, started, paused, completed, canceled
    state_map = {
        "Planned": "planned",
        "In Progress": "started",
        "Done": "completed",
        "Backlog": "planned", # Default to planned for backlog? Or maybe allow backlog state if supported.
        # Linear projects don't have "backlog" state in the same way issues do. They have status.
        # "planned", "started", "paused", "completed", "canceled"
    }

    linear_state = state_map.get(state, "planned")

    query = """
    mutation CreateProject($input: ProjectCreateInput!) {
        projectCreate(input: $input) {
            project {
                id
                name
                slugId
            }
        }
    }
    """
    variables = {
        "input": {
            "teamIds": [team_id],
            "name": title,
            "description": description,
            "state": linear_state
        }
    }
    data = run_query(query, variables, api_key)
    return data["projectCreate"]["project"]

def create_issue(team_id, project_id, title, description, priority, api_key):
    query = """
    mutation CreateIssue($input: IssueCreateInput!) {
        issueCreate(input: $input) {
            issue {
                id
                identifier
                title
            }
        }
    }
    """
    variables = {
        "input": {
            "teamId": team_id,
            "projectId": project_id,
            "title": title,
            "description": description,
            "priority": priority
        }
    }
    data = run_query(query, variables, api_key)
    return data["issueCreate"]["issue"]

def parse_epic(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Extract Title
    title_match = re.search(r'^# Epic: (.+)', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else "Unknown Epic"

    # Extract Status
    status_match = re.search(r'\*\*Status\*\*: \[(.*?)\]', content)
    status = status_match.group(1).strip() if status_match else "Planned"

    # Extract Story IDs
    story_ids = re.findall(r'- \[.*?\] .*? - (US-[A-Z0-9]+)', content)

    return {
        "title": title,
        "description": content, # Use full content as description
        "status": status,
        "story_ids": story_ids,
        "filepath": filepath
    }

def parse_story(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Extract Title (from H1 or similar)
    title_match = re.search(r'^# User Story: (.+)', content, re.MULTILINE)
    # Sometimes it might be "Story Title" section
    if not title_match:
        title_match = re.search(r'## Story Title\n(.+)', content)

    title = title_match.group(1).strip() if title_match else "Unknown Story"

    # Extract Priority
    # P0 - Critical -> 1
    # P1 - High -> 2
    # P2 - Medium -> 3
    # P3 - Low -> 4
    # Try different patterns for Priority header
    priority_match = re.search(r'Priority.*\n- \[[xX]\] (P\d)', content, re.MULTILINE | re.IGNORECASE)
    if not priority_match:
        # Fallback: look for just the checked box with P code if header is different
        priority_match = re.search(r'- \[[xX]\] (P\d) -', content, re.MULTILINE | re.IGNORECASE)

    priority_code = priority_match.group(1) if priority_match else "P0" # Default to P0 if not found

    priority_map = {
        "P0": 1, "P1": 2, "P2": 3, "P3": 4
    }
    priority = priority_map.get(priority_code, 0)

    # Extract ID from filename or content
    # Filename: story-player-elimination-US-GF5.md -> US-GF5
    filename = os.path.basename(filepath)
    id_match = re.search(r'(US-[A-Z0-9]+)', filename)
    story_id = id_match.group(1) if id_match else None

    return {
        "title": title,
        "description": content,
        "priority": priority,
        "id": story_id,
        "filepath": filepath
    }

def main():
    parser = argparse.ArgumentParser(description="Import Epics and Stories to Linear")
    parser.add_argument("--api-key", help="Linear API Key")
    parser.add_argument("--team-id", help="Linear Team ID")
    args = parser.parse_args()

    api_key = args.api_key or os.environ.get("LINEAR_API_KEY")
    if not api_key:
        print("Error: LINEAR_API_KEY not found. Please provide it via --api-key or env var.")
        sys.exit(1)

    # Get Team
    if not args.team_id:
        teams = get_teams(api_key)
        if not teams:
            print("No teams found in Linear.")
            sys.exit(1)

        print("Available Teams:")
        for i, team in enumerate(teams):
            print(f"{i}: {team['name']} ({team['key']}) - ID: {team['id']}")

        # If interactive, ask user. But here we might just pick the first one if not interactive.
        # For automation, let's assume the first team is correct or fail if multiple?
        # Let's pick the first one for now, or allow user to pass it.
        team_id = teams[0]['id']
        print(f"Using Team: {teams[0]['name']}")
    else:
        team_id = args.team_id

    # Parse Plan
    with open("linear_plan.md", "r") as f:
        plan_content = f.read()

    # Find Epics and Stories file paths
    # Matches lines like: 1. Player Elimination (MVP) (`epics/epic-mvp-elimination.md`)
    epic_files = re.findall(r'`(epics/[^`]+)`', plan_content)
    story_files = re.findall(r'`(stories/[^`]+)`', plan_content)

    print(f"Found {len(epic_files)} Epics and {len(story_files)} Stories.")

    epics_data = {}
    for ef in epic_files:
        if os.path.exists(ef):
            epic = parse_epic(ef)
            epics_data[ef] = epic
            print(f"Parsed Epic: {epic['title']}")
        else:
            print(f"Warning: Epic file not found: {ef}")

    stories_data = {}
    for sf in story_files:
        if os.path.exists(sf):
            story = parse_story(sf)
            if story['id']:
                stories_data[story['id']] = story
                print(f"Parsed Story: {story['title']} (ID: {story['id']})")
            else:
                print(f"Warning: Could not determine ID for Story file: {sf}")
        else:
            print(f"Warning: Story file not found: {sf}")

    # Create Epics (Projects)
    # We also need to keep track of created projects to link stories
    # Map story_id -> project_id
    story_to_project_map = {}

    for epic_path, epic in epics_data.items():
        print(f"Creating Project for Epic: {epic['title']}...")
        try:
            project = create_project(team_id, epic['title'], epic['description'], epic['status'], api_key)
            project_id = project['id']
            print(f"Created Project: {project['name']} (ID: {project['id']})")

            for story_id in epic['story_ids']:
                story_to_project_map[story_id] = project_id

        except Exception as e:
            print(f"Failed to create project for {epic['title']}: {e}")

    # Create Stories (Issues)
    for story_id, story in stories_data.items():
        project_id = story_to_project_map.get(story_id)
        if not project_id:
            print(f"Warning: Story {story_id} ({story['title']}) is not linked to any parsed Epic. Creating without Project.")
            # Still create it? Or skip? Let's create it without project.

        print(f"Creating Issue for Story: {story['title']}...")
        try:
            issue = create_issue(team_id, project_id, story['title'], story['description'], story['priority'], api_key)
            print(f"Created Issue: {issue['identifier']} (ID: {issue['id']})")
        except Exception as e:
            print(f"Failed to create issue for {story['title']}: {e}")

if __name__ == "__main__":
    main()
