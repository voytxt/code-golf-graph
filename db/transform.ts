// run with deno

const file = await Deno.readTextFile('./data-original.json');
const data = JSON.parse(file) as ExportedData;

const days: Record<string, number> = {};

const originalAmountOfMessages = data.messages.length;
let newAmountOfMessages = data.messages.length;

for (const message of data.messages) {
  if (message.embeds[0] && message.embeds[0].title.includes('Tied')) {
    newAmountOfMessages--;
    continue;
  }

  const day = new Date(message.timestamp).toISOString().slice(0, 10);

  days[day] ??= 0;
  days[day]++;
}

console.log({ originalAmountOfMessages, newAmountOfMessages });

await Deno.writeTextFile('./data.json', JSON.stringify(Object.entries(days).map(([date, value]) => [date, value])));

// types from chatgpt
interface MessageAuthorRole {
  id: string;
  name: string;
  color: string;
  position: number;
}

interface MessageAuthor {
  id: string;
  name: string;
  discriminator: string;
  nickname: string;
  color: string;
  isBot: boolean;
  roles: MessageAuthorRole[];
  avatarUrl: string;
}

interface MessageEmoji {
  id: string;
  name: string;
  code: string;
  isAnimated: boolean;
  imageUrl: string;
}

interface MessageUser {
  id: string;
  name: string;
  discriminator: string;
  nickname: string;
  isBot: boolean;
  avatarUrl: string;
}

interface MessageReaction {
  emoji: MessageEmoji;
  count: number;
  users: MessageUser[];
}

interface Message {
  id: string;
  type: string;
  timestamp: string;
  timestampEdited: string | null;
  callEndedTimestamp: string | null;
  isPinned: boolean;
  content: string;
  author: MessageAuthor;
  attachments: any[]; // Define type if needed
  embeds: any[]; // Define type if needed
  stickers: any[]; // Define type if needed
  reactions: MessageReaction[];
  mentions: any[]; // Define type if needed
}

interface DateRange {
  after: string | null;
  before: string | null;
}

interface ExportedData {
  guild: {
    id: string;
    name: string;
    iconUrl: string;
  };
  channel: {
    id: string;
    type: string;
    categoryId: string;
    category: string;
    name: string;
    topic: string;
  };
  dateRange: DateRange;
  exportedAt: string;
  messages: Message[];
}
