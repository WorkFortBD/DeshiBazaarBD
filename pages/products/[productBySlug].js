import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux"
import MainLayout from "../../components/layouts/Layout"
import HomeFeaturList from "../../components/layouts/page/home/HomeFeaturList"
import ProductDetailInfo from "../../components/layouts/page/productdetails/ProductDetailInfo"
import ProductDetailsDescrition from "../../components/layouts/page/productdetails/ProductDetailsDescrition"
import ElegentChairRating from "../../components/layouts/page/productdetails/ElegentChairRating"
import { fetchProductBySlug, fetchProducts } from "../../store/redux/products/actions/ProductAction"
import LoadingSkelleton from "./../../components/master/skelleton/LoadingSkelleton";
import Head from 'next/head'
import ProductReview from "../../components/layouts/page/productdetails/ProductReview"

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
                    <ProductDetailsDescrition />
                    <ProductReview />
                    <ElegentChairRating />
                    <HomeFeaturList />
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