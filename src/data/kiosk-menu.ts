export type KioskLanguage = "vi" | "en";
export type KioskProduct = {
  id: string;
  name: Record<KioskLanguage, string>;
  description: Record<KioskLanguage, string>;
  category: "burger" | "chicken" | "sides" | "drinks" | "dessert";
  price: number;
  image: string;
  meal?: number;
};

// Deliberately illustrative prices, not a live restaurant menu.
export const KIOSK_PRODUCTS: KioskProduct[] = [
  {id:"bigmac",name:{vi:"Burger Big Mac",en:"Big Mac"},description:{vi:"Hai lớp bò, phô mai, rau xà lách và xốt Big Mac.",en:"Two beef patties, cheese, lettuce and Big Mac sauce."},category:"burger",price:76000,meal:109000,image:"big-mac.png"},
  {id:"cheese",name:{vi:"Burger bò phô mai",en:"Cheeseburger"},description:{vi:"Bò, phô mai, dưa chuột muối và xốt cà chua.",en:"Beef, cheese, pickles and ketchup."},category:"burger",price:46000,meal:79000,image:"cheeseburger.png"},
  {id:"mcchicken",name:{vi:"Burger gà Mayo",en:"Chicken Mayo Burger"},description:{vi:"Gà giòn, rau xà lách và xốt mayonnaise.",en:"Crispy chicken, lettuce and mayonnaise."},category:"burger",price:36000,meal:69000,image:"mcchicken.png"},
  {id:"chicken",name:{vi:"1 miếng gà rán",en:"1-piece fried chicken"},description:{vi:"Một miếng gà rán giòn.",en:"One piece of crispy fried chicken."},category:"chicken",price:39000,meal:72000,image:"chicken.png"},
  {id:"fries",name:{vi:"Khoai tây chiên vừa",en:"Medium fries"},description:{vi:"Một phần khoai tây chiên cỡ vừa.",en:"One medium portion of fries."},category:"sides",price:29000,image:"fries.png"},
  {id:"corn",name:{vi:"Bắp tách hạt",en:"Sweet corn"},description:{vi:"Một phần bắp tách hạt.",en:"One serving of sweet corn."},category:"sides",price:36000,image:"corn.png"},
  {id:"coke",name:{vi:"Coca-Cola vừa",en:"Medium Coca-Cola"},description:{vi:"Một ly Coca-Cola cỡ vừa.",en:"One medium Coca-Cola."},category:"drinks",price:25000,image:"coke.png"},
  {id:"sprite",name:{vi:"Sprite vừa",en:"Medium Sprite"},description:{vi:"Một ly Sprite cỡ vừa.",en:"One medium Sprite."},category:"drinks",price:25000,image:"sprite.png"},
  {id:"fanta",name:{vi:"Fanta vừa",en:"Medium Fanta"},description:{vi:"Một ly Fanta cỡ vừa.",en:"One medium Fanta."},category:"drinks",price:25000,image:"fanta.png"},
  {id:"sundae",name:{vi:"Kem Sundae sô-cô-la",en:"Chocolate Sundae"},description:{vi:"Kem vani với xốt sô-cô-la.",en:"Vanilla soft serve with chocolate sauce."},category:"dessert",price:29000,image:"sundae.png"},
];

export const KIOSK_CATEGORIES = [
  {id:"burger",vi:"Burger",en:"Burgers",image:"big-mac.png"},
  {id:"chicken",vi:"Gà rán",en:"Chicken",image:"chicken.png"},
  {id:"combo",vi:"Combo",en:"Meals",image:"fries.png"},
  {id:"sides",vi:"Món phụ",en:"Sides",image:"corn.png"},
  {id:"drinks",vi:"Đồ uống",en:"Drinks",image:"coke.png"},
  {id:"dessert",vi:"Tráng miệng",en:"Desserts",image:"sundae.png"},
] as const;
