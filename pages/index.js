import Head from 'next/head';
import Image from 'next/image';
// import Datalist from "@/data/data.json";
import Datalist from "@/data/list.json";
import Link from "next/link";


const Boxvalue = (props) => {
  return (
    <div className='box-value'>
      {
        Object.keys(Datalist).map((a, i) => i == props &&
          Datalist[a].value.map(e =>
            <Link href={e.link} key={e.val}>{e.val}</Link>
          )
        )
      }
    </div>
  );
};

export default function Home() {

  return (
    <>
      <Head>
        <title>Periyar University - Exams</title>
        <meta name="description" content="Periyar University - Exams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className='container'>
        <h1>M.Phil/Ph.D Common Entrance Exam (CET-22-JULY-2023)</h1>
        <div className='box-container'>
          {
            Object.keys(Datalist).map((a, i) => {
              return <div key={a} className='box'><h1>{Datalist[a].name}</h1>{Boxvalue(i)}</div>;
            })
          }
        </div>
      </div>
    </>
  );
}
