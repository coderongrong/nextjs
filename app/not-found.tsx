import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 Not Found",
  description: "Page not found",
};
export default function NotFound() {
  return (
    <div>
      404 Not Found
    </div>
  );
}

