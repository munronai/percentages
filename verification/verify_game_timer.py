import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # 1. Set localStorage to simulate signed-in user
    page.goto("http://localhost:3000")
    page.evaluate("localStorage.setItem('playerName', 'TestUser')")

    # 2. Navigate to Home Page
    page.goto("http://localhost:3000")

    # 3. Wait for Start Game button to be enabled and click it
    start_button = page.get_by_role("button", name="Start Solo Game")
    start_button.wait_for(state="visible")

    # Take screenshot of home page with enabled button
    page.screenshot(path="verification/home_page_enabled.png")
    print("Screenshot of home page saved.")

    start_button.click()

    # 4. Wait for Game Page to load and question to appear
    # The question text "Adding what single letter" is from the mock handler
    page.get_by_text("Adding what single letter").wait_for()

    # 5. Check timer
    # Initial timer should be 60s
    page.get_by_text("60s").wait_for()
    print("Timer started at 60s.")

    # Wait for timer to decrease
    # We wait a bit more than 1 second to ensure the interval fires
    time.sleep(1.5)

    # Take screenshot of game page with timer running
    page.screenshot(path="verification/game_page_timer.png")
    print("Screenshot of game page saved.")

    # Verify timer has decreased (should be 59s or 58s)
    # Using a flexible locator or text check might be needed if exact timing varies
    content = page.content()
    if "59s" in content or "58s" in content:
        print("Timer is counting down correctly.")
    else:
        print("Timer check failed or timing off.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
