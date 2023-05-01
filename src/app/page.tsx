import MainComponents from "../components/MainComponents/MainComponents";

type Asset = {
  id: string;
  name: string;
  location: number[];
  category: string;
  riskRating: string;
  riskFactor: { [key: string]: number };
  year: number;
};

async function getDecades() {
  const res = await fetch("http://localhost:3000/api/decades", {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json()
}

async function getAssetsForMap() {
  const res = await fetch("http://localhost:3000/api/assetsForMap", {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json()
}

async function getAssets() {
  const res = await fetch("http://localhost:3000/api/assets/", {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    console.log(res);
  }
  return res.json()
}

export default async function Page() {
  const decades:{year:number}[] = await getDecades();
  const assetsData:Asset[] = await getAssets();
  const decadesList:number[] = [...new Set(decades.map(decade => decade.year))].sort();
  
  return (
    <div className="m-8">
      <MainComponents decadesList={decadesList} assetsData={assetsData}/>
    </div>
  );
}
