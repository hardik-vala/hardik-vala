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
SUBJECT = "hardik's user manual for work (v2)"
LINK = "https://www.hardikvala.com/blog/hardiks-user-manual-work-v2"
BODY = f"""
    <html>
        <body>
            <p>hey,</p>

            <p>i've published a new post: <a href="{LINK}">{SUBJECT}</a>.</p>

            <p>it's not really a post. it's my personal user manual. i've had one for years, sharing it with people i've work with. i have no clue whether anybody acts on the information, let alone reads it. but at minimum, it's a great, reflective exercise in self-awareness. messaging you to encourage you to try writing one for yourself.</p>

            <p>you're receiving this because you made the poor decision to subscribe to my blog. but thanks for being a part of my journey.</p>

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
