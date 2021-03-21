import React from "react"
import { useRouter } from 'next/router'
import MainLayout from "../../components/layouts/Layout"
import ProductDetailInfo from "../../components/layouts/page/productdetails/ProductDetailInfo"
import LoadingSkelleton from "./../../components/master/skelleton/LoadingSkelleton";
import Head from 'next/head'

export default function ProductBySlug({ product }) {
    const router = useRouter();
    const loading = false;

    return (
        <>
            <Head>
                <title>
                    {product.name} || Ecommerce
                </title>
            </Head>
            <MainLayout>
                <>
                    <ProductDetailInfo product={product} />
                </>
                {
                    loading &&
                    <div className="mb-5">
                        {loading && (
                            <LoadingSkelleton
                                alignment="vertical"
                                count={1}
                                width={730}
                                height={200}
                            />
                        )}
                    </div>
                }

            </MainLayout>
        </>
    );
}

// export async function getStaticProps({ params }) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}get-item-detail/${params.productBySlug}`)
//     const dataJSON = await res.json();
//     const data = dataJSON.data;
//     return { props: { product: data } }
// }

// export async function getStaticPaths() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}get-items`);
//     const dataJSON = await res.json();
//     const products = dataJSON.data.data;

//     const paths = products.map((product) => ({
//         params: { productBySlug: product.sku }
//     }));
//     return { paths, fallback: false }
//     // const router = useRouter();
//     // const { productBySlug } = router.query
//     // const paths = [{sku: 'asus-12'}].map((product) => ({
//     //     params: { productBySlug: product.sku }
//     // }));
//     // return { paths, fallback: false }
// }

export const getServerSideProps = async (context) => {
    const productBySlug = context.params.productBySlug
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}get-item-detail/${productBySlug}`)
    const dataJSON = await res.json();
    const data = dataJSON.data;
    return {
        props: { product: data }
    }
}