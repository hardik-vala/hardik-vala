from dotenv import load_dotenv
import os
import resend
import sys
import time
from typing import List

if len(sys.argv) > 1:
    env_file = sys.argv[1]
    load_dotenv(env_file)
else:
    load_dotenv()


resend.api_key = os.getenv("RESEND_API_KEY")

FROM_EMAIL = os.getenv("FROM_EMAIL")
TO_EMAILS = os.getenv("TO_EMAILS", "").split(",")
REPLY_TO_EMAIL = os.getenv("REPLY_TO_EMAIL", FROM_EMAIL)
SUBJECT = "the paradox of skill"
LINK = "https://www.hardikvala.com/blog/the-paradox-of-skill"
BODY = f"""
    <html>
        <body>
            <p>hey,</p>

            <p>i've published a new post: <a href="{LINK}">{SUBJECT}</a>.</p>

            <p>it's about a phenomenon i find fascinating, called the paradox of skill. basically, it's the idea that in any competition where the players are becoming more skilled, who wins—counterintuitively—depends more and more on luck. ya, luck—not skill. it doesn't just apply to traditional competitions like sports, but to college admissions, dating, and job hunting. this one's a bit technical so brace yourself.</p>

            <p>you're receiving this because you made the poor decision to subscribe to my blog. but thanks for being a part of the journey.</p>

            <p>onward and upward,</p>

            <p>hardik</p>
        </body>
    </html>
    """.strip()


def send_emails(from_email: str, to_emails: List[str]) -> None:
    for recipient in to_emails:
        try:
            response = resend.Emails.send(
                {"from": from_email, "to": recipient, "reply_to": REPLY_TO_EMAIL, "subject": SUBJECT, "html": BODY}
            )
            print(f"Email sent successfully to {recipient}. ID: {response['id']}")
        except Exception as e:
            print(f"Failed to send email to {recipient}: {str(e)}")
        # 1 second delay.
        time.sleep(1)


if __name__ == "__main__":
    send_emails(FROM_EMAIL, TO_EMAILS)
