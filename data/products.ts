export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    frameCount: number;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    freshnessSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
 }
 export const products: Product[] = [
    {
        id: "chocolate",
        name: "Dutch Chocolate",
        subName: "Velvety smooth.",
        price: "₹140",
        description: "Premium Cocoa - Almond Milk base - Plant Protein",
        folderPath: "/images/chocolate",
        frameCount: 200,
        themeColor: "#8D6E63",
        gradient: "linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)",
        features: ["Premium Cocoa", "Almond Milk", "Plant Protein"],
        stats: [{ label: "Dairy", val: "0%" }, { label: "Protein", val: "12g" }, { label: "Cocoa", val: "100%" }],
        section1: { title: "Dutch Chocolate.", subtitle: "Velvety smooth." },
        section2: { title: "Decadence redefined.", subtitle: "Rich, dark cocoa blended with creamy almond milk for a guilt-free treat." },
        section3: { title: "Plant-powered energy.", subtitle: "Loaded with natural plant protein to fuel your active lifestyle." },
        section4: { title: "Indulgence without compromise.", subtitle: "" },
        detailsSection: {
            title: "Ethically Sourced Cocoa",
            description: "We source our cocoa from sustainable farms in Ghana, ensuring fair wages and premium quality. Blended with our house-made almond milk, this drink offers a silky texture that rivals traditional dairy shakes, but with zero cholesterol and 100% plant-based goodness.",
            imageAlt: "Chocolate Details"
        },
        freshnessSection: {
            title: "Cold-Crafted Perfection",
            description: "Heat destroys delicate cocoa flavonoids. That's why we mix our Dutch Chocolate cold. Our almond milk is pressed fresh daily, never stored. The result is a clean, robust chocolate flavor that feels heavy on the tongue but light on the stomach."
        },
        buyNowSection: {
            price: "₹140",
            unit: "per 300ml bottle",
            processingParams: ["Plant Based", "Cold Blended", "Dairy Free"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    },
    {
        id: "mango",
        name: "Alphonso Mango",
        subName: "Tropical bliss.",
        price: "₹150",
        description: "Real Ratnagiri Alphonsos - Zero Added Sugar - Cold Pressed",
        folderPath: "/images/mango",
        frameCount: 200,
        themeColor: "#FFC107",
        gradient: "linear-gradient(135deg, #FFC107 0%, #FF9800 100%)",
        features: ["Real Alphonsos", "Zero Sugar", "Cold Pressed"],
        stats: [{ label: "Real Mango", val: "95%" }, { label: "Added Sugar", val: "0g" }, { label: "Vitamin C", val: "100%" }],
        section1: { title: "Alphonso Mango.", subtitle: "Tropical bliss." },
        section2: { title: "Sun-kissed sweetness.", subtitle: "Sourced directly from Ratnagiri farms. Pure mango, nothing else." },
        section3: { title: "Packed with Vitamin C.", subtitle: "A natural immunity booster in every sip." },
        section4: { title: "Summer in a bottle.", subtitle: "" },
        detailsSection: {
            title: "The King of Fruits",
            description: "We use only hand-picked Alphonso mangoes from authentic Ratnagiri orchards. By cold-pressing the fruit, we retain the vibrant color, thick texture, and irresistible aroma of fresh mangoes without any artificial additives or refined sugars.",
            imageAlt: "Mango Details"
        },
        freshnessSection: {
            title: "Cold-Pressed Freshness",
            description: "Heat pasteurization destroys the delicate flavor profile of fresh mangoes. Our gentle cold-pressure process keeps the nutrients intact and extends shelf life naturally, giving you a fresh-from-the-orchard taste."
        },
        buyNowSection: {
            price: "₹150",
            unit: "per 300ml bottle",
            processingParams: ["Cold Pressed", "No Added Sugar", "Vegan"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    },
    {
        id: "pomegranate",
        name: "Ruby Pomegranate",
        subName: "Antioxidant powerhouse.",
        price: "₹160",
        description: "Cold Pressed - Whole Arils - Immunity Booster",
        folderPath: "/images/pomegranate",
        frameCount: 200,
        themeColor: "#E91E63",
        gradient: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
        features: ["Whole Arils", "Antioxidants", "Cold Pressed"],
        stats: [{ label: "Real Fruit", val: "100%" }, { label: "Antioxidants", val: "High" }, { label: "Added Water", val: "0%" }],
        section1: { title: "Ruby Pomegranate.", subtitle: "Antioxidant powerhouse." },
        section2: { title: "Tart and tangy.", subtitle: "Pressed from whole ruby-red arils for maximum flavor and nutrition." },
        section3: { title: "Heart-healthy fuel.", subtitle: "Loaded with natural antioxidants and vitamins." },
        section4: { title: "Refreshingly bold.", subtitle: "" },
        detailsSection: {
            title: "Pure Ruby Red",
            description: "Each bottle contains the juice of three whole premium pomegranates. We carefully extract the juice from the delicate ruby arils without crushing the bitter seeds, resulting in a perfectly balanced, vibrant, and tart-sweet nectar.",
            imageAlt: "Pomegranate Details"
        },
        freshnessSection: {
            title: "Uncompromising Quality",
            description: "No added water, no sugar, no preservatives. Just pure, cold-pressed pomegranate juice that preserves the high antioxidant levels and complex, refreshing taste of the raw fruit."
        },
        buyNowSection: {
            price: "₹160",
            unit: "per 300ml bottle",
            processingParams: ["Cold Pressed", "100% Juice", "No Preservatives"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    },
    {
        id: "apple",
        name: "Crisp Apple",
        subName: "Orchard fresh.",
        price: "₹130",
        description: "Kashmiri Apples - Clear Juice - Naturally Sweet",
        folderPath: "/images/apple",
        frameCount: 160,
        themeColor: "#8BC34A",
        gradient: "linear-gradient(135deg, #8BC34A 0%, #558B2F 100%)",
        features: ["Kashmiri Apples", "Naturally Sweet", "Clear Juice"],
        stats: [{ label: "Real Apple", val: "100%" }, { label: "Sugar", val: "0g" }, { label: "Refreshment", val: "Max" }],
        section1: { title: "Crisp Apple.", subtitle: "Orchard fresh." },
        section2: { title: "Crisp and clear.", subtitle: "Made from the finest Kashmiri apples. Light, refreshing, and naturally sweet." },
        section3: { title: "Everyday hydration.", subtitle: "A perfect thirst quencher without the heavy calories." },
        section4: { title: "Simply Apple.", subtitle: "" },
        detailsSection: {
            title: "From the Himalayas",
            description: "We source our apples directly from the pristine orchards of Kashmir. The cool climate produces apples with a perfect balance of sweetness and tartness, which we press into a clear, crisp, and incredibly refreshing juice.",
            imageAlt: "Apple Details"
        },
        freshnessSection: {
            title: "Filtered to Perfection",
            description: "Our unique cold-filtration process removes the pulp while retaining the delicate flavor notes and essential vitamins, giving you a smooth, clean drinking experience, just like biting into a fresh apple."
        },
        buyNowSection: {
            price: "₹130",
            unit: "per 300ml bottle",
            processingParams: ["Cold Pressed", "Filtered", "100% Natural"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    },
    {
        id: "guava",
        name: "Tropical Guava",
        subName: "Exotic & refreshing.",
        price: "₹145",
        description: "Pink Guava - Rich in Vitamin C - Cold Pressed",
        folderPath: "/images/guava",
        frameCount: 200,
        themeColor: "#F06292",
        gradient: "linear-gradient(135deg, #F06292 0%, #E91E8C 100%)",
        features: ["Pink Guava", "Vitamin C Rich", "Cold Pressed"],
        stats: [{ label: "Real Guava", val: "100%" }, { label: "Vitamin C", val: "4x" }, { label: "Added Sugar", val: "0g" }],
        section1: { title: "Tropical Guava.", subtitle: "Exotic & refreshing." },
        section2: { title: "Pink paradise.", subtitle: "Crafted from hand-picked pink guavas for a lusciously tropical experience." },
        section3: { title: "Immunity powerhouse.", subtitle: "4x more Vitamin C than oranges, cold-pressed to preserve every drop of goodness." },
        section4: { title: "Taste the tropics.", subtitle: "" },
        detailsSection: {
            title: "Sun-Ripened Pink Guava",
            description: "We source only the finest pink guavas from tropical farms, where warm sun and rich soil create fruit with unmatched sweetness and aroma. Each bottle is cold-pressed at peak ripeness, delivering a vibrant pink nectar that is naturally rich in Vitamin C, antioxidants, and dietary fibre.",
            imageAlt: "Guava Details"
        },
        freshnessSection: {
            title: "Cold-Pressed Tropical Purity",
            description: "Heat processing destroys the delicate aromatic compounds that give guava its signature floral scent. Our cold-press method locks in the fragrance, the bright colour, and the full nutritional profile of fresh guava — giving you an experience that feels like biting straight into the fruit."
        },
        buyNowSection: {
            price: "₹145",
            unit: "per 300ml bottle",
            processingParams: ["Cold Pressed", "No Added Sugar", "Vegan"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    },
    {
        id: "strawberry",
        name: "Garden Strawberry",
        subName: "Sweet & tangy bliss.",
        price: "₹155",
        description: "Fresh Strawberries - Zero Preservatives - Cold Pressed",
        folderPath: "/images/strawberry",
        frameCount: 192,
        themeColor: "#EF5350",
        gradient: "linear-gradient(135deg, #EF5350 0%, #B71C1C 100%)",
        features: ["Fresh Strawberries", "Zero Preservatives", "Cold Pressed"],
        stats: [{ label: "Real Fruit", val: "100%" }, { label: "Antioxidants", val: "High" }, { label: "Preservatives", val: "0%" }],
        section1: { title: "Garden Strawberry.", subtitle: "Sweet & tangy bliss." },
        section2: { title: "Berry perfection.", subtitle: "Pressed from sun-ripened strawberries for a naturally vibrant, bold flavour." },
        section3: { title: "Antioxidant rich.", subtitle: "Loaded with anthocyanins and Vitamin C to keep you glowing from within." },
        section4: { title: "Simply irresistible.", subtitle: "" },
        detailsSection: {
            title: "Farm-Fresh Strawberries",
            description: "We partner with small family farms where strawberries are grown without artificial pesticides and harvested only when fully ripe. The result is a deep red juice packed with natural sugars, anthocyanins, and Vitamin C — bottled within hours of pressing for peak freshness.",
            imageAlt: "Strawberry Details"
        },
        freshnessSection: {
            title: "Pressed at Peak Ripeness",
            description: "No concentrates, no added flavours, no preservatives. Just pure, cold-pressed strawberry juice that captures the bold, tangy sweetness of a perfectly ripe berry. Every sip tastes like a summer morning at the farm."
        },
        buyNowSection: {
            price: "₹155",
            unit: "per 300ml bottle",
            processingParams: ["Cold Pressed", "100% Natural", "No Preservatives"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    }
];
