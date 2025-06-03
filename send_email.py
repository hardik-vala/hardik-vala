from dotenv import load_dotenv
import os
import resend
import time
from typing import List

# Load environment variables
load_dotenv()


resend.api_key = os.getenv("RESEND_API_KEY")

FROM_EMAIL = os.getenv("FROM_EMAIL")
TO_EMAILS = os.getenv("TO_EMAILS", "").split(",")
REPLY_TO_EMAIL = os.getenv("REPLY_TO_EMAIL", FROM_EMAIL)
SUBJECT = "🚫 Pathological Demand Avoidance"
LINK = "https://www.hardikvala.com/blog/pathological-demand-avoidance"
BODY = f"""
    <html>
        <body>
            <p>Hey,</p>

            <p>I've published a new post: <a href="{LINK}">{SUBJECT}</a>.</p>

            <p>It's about preserving personal autonomy through unhealthy avoidance.</p>

            <p>You're receiving this because you made the poor decision to join my inner circle. But thanks for being a part of it.</p>

            <p>Onward and upward,</p>

            <p>Hardik</p>
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
