export interface CommonNavaigationLink {
  name: string;
  url: string;
  icon: string;
  subLinks?: { name: string; url: string; icon: string }[];
}
