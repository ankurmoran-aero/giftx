export type Category = 
  | 'all'
  | 'tech'
  | 'luxury'
  | 'lifestyle'
  | 'experiences'
  | 'personalized'
  | 'wellness';

export type RecipientType = 
  | 'anyone'
  | 'partner'
  | 'parents'
  | 'friends'
  | 'colleagues'
  | 'kids';

export interface GiftItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  recipient: RecipientType[];
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  gift: GiftItem;
  quantity: number;
  giftWrap?: boolean;
  giftMessage?: string;
}

export interface SecretSantaParticipant {
  id: string;
  name: string;
  email: string;
  wishlistHint?: string;
  assignedTo?: string;
}
