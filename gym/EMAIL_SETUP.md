# Email Setup Instructions

## Environment Variables

Create a `.env` file in the `gym` directory with the following variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Gmail Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS` in your .env file

## Alternative Email Services

You can modify the email service configuration in `utils/emailService.js` to use other email providers:

- **Outlook/Hotmail**: Change service to 'hotmail'
- **Yahoo**: Change service to 'yahoo'
- **Custom SMTP**: Use custom SMTP configuration

## Testing

The email service will automatically send:
1. **Welcome emails** when users register
2. **Order confirmation emails** when orders are completed

## Troubleshooting

- Make sure your .env file is in the `gym` directory
- Verify your email credentials are correct
- Check that 2FA is enabled and app password is generated
- Check server logs for email sending errors
