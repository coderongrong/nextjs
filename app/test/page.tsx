import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Test",
  description: "Test page",
};

export default function Test() {
  console.log("Test page");
  return (
    <div>
      Test -- 
    </div>
  );
}