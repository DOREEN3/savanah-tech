export interface product {
    id:number;
    name:string;
    description:string;
    price:number;
    originalPrice?:number; // property is optional
    category:string;
    image:string;
    rating:number;
    review:number;
    badge?:string;
}