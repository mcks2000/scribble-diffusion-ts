// import Predictions from "@/app/ui/prediction/predictions";
// import Head from "next/head";
// import pkg from "../../package.json";
// // import { getRecentPredictions } from "@/app/lib/prisma/db";

// export async function Page() {
//   const predictions = await getRecentPredictions();
//   return (
//     <div>
//       <Head>
//         <meta name="description" content={pkg.appMetaDescription} />
//         <meta property="og:title" content={pkg.appName} />
//         <meta property="og:description" content={pkg.appMetaDescription} />
//         <title>{pkg.appName}</title>s
//       </Head>
//       <main className="container max-w-[1024px] mx-auto p-5 ">
//         <div className="container max-w-[512px] mx-auto">
//           <hgroup>
//             <h1 className="text-center text-5xl font-bold m-4">
//               {pkg.appName}
//             </h1>
//             <p className="text-center text-xl opacity-60 m-4">
//               {pkg.appSubtitle}
//             </p>
//           </hgroup>
//         </div>

//         <Predictions predictions={predictions} isProcessing={false} submissionCount={0} />
//       </main>
//     </div>
//   );
// }