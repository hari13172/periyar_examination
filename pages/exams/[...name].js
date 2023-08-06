import DataList from "@/data/list.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Local from "local-ip-address";
import Head from "next/head";

export default function ExamsName({ name }) {
  const router = useRouter();
  const [pdata, setPdata] = useState({
    password: "",
    link: "",
  });
  const [sec, setSec] = useState({
    date: "2023-02-18T",
  });

  const AuthPsk = () => {
    if (pdata.password.length > 0) {
      let a = DataList[name[1]].value.filter((a) => a.val == name[0]);
      if (a[0].psk == pdata.password) {
        router.push(pdata.link);
      } else {
        alert("wrong password");
      }
    } else {
      alert("empty field");
    }
  };

  const ClickEvent = async (link) => {
    let currentDate = new Date();

    let a = DataList[name[1]].value.filter((a) => a.val == name[0]);

    if (a.length > 0) {
      let { from, to, noon } = a[0].time;
      from = from.split(":").map((a) => parseInt(a));
      from[0] =
        new Date().getHours() > 12 && noon == "pm" ? from[0] + 12 : from[0];
      let from_date = new Date(
        `${sec.date}${String(from[0]).length > 1 ? from[0] : `0${from[0]}`}:${String(from[1]).length > 1 ? from[1] : `0${from[1]}`
        }:00`
      );

      to = to.split(":").map((a) => parseInt(a));
      to[0] = new Date().getHours() > 12 && noon == "pm" ? to[0] + 12 : to[0];
      let to_date = new Date(
        `${sec.date}${String(to[0]).length > 1 ? to[0] : `0${to[0]}`}:${String(to[1]).length > 1 ? to[1] : `0${to[1]}`
        }:00`
      );


      if (currentDate >= from_date && currentDate <= to_date || true) {
        setPdata((a) => ({ ...a, link }));

      } else {
        if (currentDate > to_date) {
          alert("this is session expired");
        } else {
          alert(
            `your session will open at ${from_date.toLocaleDateString()} ${from_date.toLocaleTimeString(
              "en-IN"
            )}`
          );
        }
      }
    }
  };
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (String(event.target.value).length > 0) {
          let a = DataList[name[1]].value.filter((a) => a.val == name[0]);
          if (a[0].psk == event.target.value) {
            router.push(a[0].lcount[0]);
          } else {
            alert("wrong password");
          }
        } else {
          alert("empty field");
        }
        // callMyFunction();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <>
    <Head>
      <title>{name.length > 1 && name.length > 0 && name[0]}</title>
    </Head>
      <div className="exam-container">
        {pdata.link && (
          <div className="getpassword">
            <div className="exam-form">
              <b onClick={() => setPdata((a) => ({ ...a, link: "" }))}>
                &#x2715;
              </b>
              <p>enter your link password</p>
              <input
                type="text"
                name="password"
                onChange={(e) =>
                  setPdata((a) => ({ ...a, password: e.target.value }))
                }
              />
              <input type="button" value="submit" onClick={AuthPsk} />
            </div>
          </div>
        )}
        <h1>{name.length > 1 && name.length > 0 && name[0]}</h1>
        <div className="exam-link">
          {(name.length > 1 && (
            <>
              {DataList[name[1]].value
                .filter((a) => a.val == name[0])
                .map((a) =>
                  a.lcount.map((e, i) => (
                    <div key={e + i} className="exam-click">
                      <p>access your exam through below link</p>
                      <span onClick={() => ClickEvent(e)}>click here</span>
                    </div>
                  ))
                )}
            </>
          )) ||
            "404 page not found"}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { name: context.query.name }, // will be passed to the page component as props
  };
}
