export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export const support = {
  async createTicket(subject: string, message: string, priority: 'low' | 'medium' | 'high'): Promise<SupportTicket> {
    const isPremium = await chrome.storage.local.get('premium');
    if (!isPremium) {
      throw new Error('Premium required for support');
    }

    const ticket: SupportTicket = {
      id: crypto.randomUUID(),
      userId: chrome.runtime.id,
      subject,
      message,
      status: 'open',
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const tickets = await this.getTickets();
    await chrome.storage.local.set({ supportTickets: [...tickets, ticket] });
    return ticket;
  },

  async getTickets(): Promise<SupportTicket[]> {
    const result = await chrome.storage.local.get('supportTickets');
    return result.supportTickets || [];
  },

  async updateTicketStatus(ticketId: string, status: 'open' | 'in-progress' | 'resolved'): Promise<void> {
    const tickets = await this.getTickets();
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    if (ticketIndex === -1) return;

    tickets[ticketIndex].status = status;
    tickets[ticketIndex].updatedAt = new Date().toISOString();
    await chrome.storage.local.set({ supportTickets: tickets });
  }
}; 