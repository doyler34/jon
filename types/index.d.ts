declare module '@/types/universe' {
  export interface UniverseEvent {
    id: string;
    title: string;
    description?: string;
    starts_at: string;
    ends_at?: string;
    venue?: {
      name: string;
      address: string;
    };
    url: string;
    status: string;
    price_range?: string;
    organizer?: {
      name: string;
    };
  }
} 