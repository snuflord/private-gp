import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";

export default function PageLayout({ pageData }: { pageData: any }) {
  console.log(pageData);

  const [data, setData] = useState({
    title: '',
    content: '',
    image: '',
    contentTwo: ',',
    bullets: []
  })

  useEffect(() => {
    const fetchData = async () => {
      if (pageData) {
        try {
          setData(pageData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [pageData]);

  const { title, content, image, contentTwo, bullets } = data;

  console.log(title, content, image, contentTwo, bullets);

  return (
    <section className="min-h-screen">
        <div className="my-8 md:my-20">
            <h1 className="font-bold text 3xl md:text-6xl mb-5">{title}</h1>
            <p>{content}</p>
            <p>{contentTwo}</p>

            {pageData.bullets.length > 0 ? (
                <div>
                    <ul>
                    {pageData.bullets.map((bullet: string, index: number) => (
                        <li className="list-disc" key={index}>{bullet}</li>
                    ))}
                    </ul>
                </div>
                ) : (
                <></>
            )}
        </div>
    </section>
    
  );
}