
import { ChatMessage } from '../types';

export const createAvarDraft = async (accessToken: string, messages: ChatMessage[], personaLabel: string) => {
  const emailBody = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
  const subject = `AVAR ROYAL LEGACY: ${personaLabel} Synchronized Link`;
  
  // RFC 2822 format for Gmail Draft
  const rawContent = [
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    `Sovereign Session Log:`,
    `----------------------`,
    emailBody,
    ``,
    `AVAR ROYAL FAMILY ACCESS V3.0 - SECURE TRANSMISSION`
  ].join('\r\n');

  // Base64Url encode
  const encodedContent = btoa(unescape(encodeURIComponent(rawContent)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: {
          raw: encodedContent
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gmail API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create draft:', error);
    throw error;
  }
};
