export default interface Ticket {
  id: number;
  title: string;
  body: string;
  priority: "low" | "medium" | "high";
  user_email: string;
}
