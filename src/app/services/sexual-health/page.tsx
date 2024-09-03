'use client'

import PageLayout from "@/app/components/PageLayout";

const pageData = [
  {
    title: "Understanding Sexual Health",
    image: "/images/sexual-health.jpg", // Replace with actual image path
    content: "Sexual health is a state of physical, emotional, mental, and social well-being in relation to sexuality.",
    contentTwo: "It is important to be informed and aware of the factors that contribute to a healthy sexual life.",
    bullets: [
        
    ],
  }
];

export default function Page() {
  return (
    <div>
      <PageLayout pageData={pageData[0]} /> {/* Pass the first element of the pageData array */}
    </div>
  );
}