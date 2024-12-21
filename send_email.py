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
SUBJECT = "Engineering Self-Confidence 😎"
LINK = "https://hardikvala.com/2024/12/16/engineering-self-confidence.html"
BODY = f"""
    <html>
        <body>
            <p>Hey,</p>

            <p>I'm emailing you from a different email to automate sending. Up until now, I've been sending each email manually. It's less personal, but I need to rescue some of my time from toil.</p>
            
            <p>Here's my new essay: <a href="{LINK}">{SUBJECT}</a>.</p>

            <p>You're receiving this because you made the poor decision to join my inner circle. But thanks for being a part of it.</p>

            <p>Onward and upward,</p>

            <p>Hardik</p>
        </body>
    </html>
    """.strip()


def send_emails(from_email: str, to_emails: List[str]) -> None:
    # style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"

    for recipient in to_emails:
        try:
            response = resend.Emails.send(
                {"from": from_email, "to": recipient, "subject": SUBJECT, "html": BODY}
            )
            print(f"Email sent successfully to {recipient}. ID: {response['id']}")
        except Exception as e:
            print(f"Failed to send email to {recipient}: {str(e)}")
        # 1 second delay.
        time.sleep(1)


if __name__ == "__main__":
    send_emails(FROM_EMAIL, TO_EMAILS)
