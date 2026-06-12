// All site content for JJ Cleaning Services, extracted from jjcleaningservices.uk
"use strict";

const contact = {
  phone1: "0121 751 8515",
  phone2: "07463 128266",
  phone1Href: "tel:+441217518515",
  phone2Href: "tel:+447463128266",
  emailInfo: "Info@JJCleaningServices.uk",
  emailCustomer: "Customerservices@JJCleaningServices.uk",
  emailCommercial: "Commercial.Enquiries@JJCleaningServices.uk",
  emailEmergency: "Emergency-call-outs@JJCleaningServices.uk",
  emailStreet: "Street.Cleaning@JJCleaningServices.uk",
  emailHire: "Hire@JJCleaningServices.uk",
  emailFacilities: "Facilities@JJCleaningServices.uk",
  emailCommunity: "Community.Support@JJCleaningServices.uk",
  emailCareers: "Careers@JJCSCareers.co.uk",
  emailSafety: "Site.Safety@JJCleaningServices.uk",
  address: ["JJ Group (UK) LTD", "77 Roma Road", "Tyseley", "Birmingham B11 2JH"],
  addressNote: "Visit by appointment only",
  hours: "Mon to Fri 8:00am to 6:00pm. Sat and Sun 10:00am to 4:00pm.",
  hoursShort: "Mon-Fri 8-6 / Sat-Sun 10-4",
  legal: "JJ Group (UK) LTD company number 75079657. Registered in England & Wales. Correspondence address: 77 Roma Road, Tyseley, Birmingham, B11 2JH.",
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/jj_cleaning_services/", icon: "instagram" },
    { name: "Facebook", url: "https://www.facebook.com/JJCleaningServicesbham", icon: "facebook" },
    { name: "TikTok", url: "https://www.tiktok.com/@jjcleaningservices", icon: "tiktok" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/jj-cleaning-services", icon: "linkedin" },
    { name: "X", url: "https://x.com/jjcsbham", icon: "x" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UCDwylIk__fopH2OX_b2lP_A", icon: "youtube" },
  ],
  portalUrl: "https://squeeg.ee/portal/jjcleaningservices",
  careersPortal: "https://careers.giighire.com/jjcleaningservices",
};

// Service catalogue. Slug doubles as the html filename.
const services = [
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    short: "Frames, sills and glass cleaned on every visit, traditional or pure water system.",
    img: "window-cleaning.jpg",
    icon: "droplet",
  },
  {
    slug: "vehicle-valeting",
    name: "Vehicle Valeting",
    short: "From a quick exterior wash to a full showroom-condition restoration.",
    img: "vehicle-valeting.jpg",
    icon: "car",
  },
  {
    slug: "fleet-cleaning",
    name: "Fleet Cleaning",
    short: "Mobile fleet wash solutions with consistent, high quality results.",
    img: "fleet-cleaning.webp",
    icon: "truck",
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    short: "Block paving, concrete, tarmac and natural stone restored to like-new.",
    img: "pressure-washing.jpg",
    icon: "spray",
  },
  {
    slug: "carpet-cleaning",
    name: "Carpet Cleaning",
    short: "Deep steam cleaning that removes dirt, bacteria and allergens from the fibres.",
    img: "carpet-cleaning.jpg",
    icon: "sparkles",
  },
  {
    slug: "upholstery-cleaning",
    name: "Upholstery Cleaning",
    short: "Sofas, mattresses, rugs and furniture professionally cleaned and restored.",
    img: "upholstery-cleaning.jpg",
    icon: "armchair",
  },
  {
    slug: "general-cleaning",
    name: "General Cleaning",
    short: "Flexible house, office and commercial cleaning that fits your schedule.",
    img: "commercial-office.jpg",
    icon: "brush",
  },
  {
    slug: "commercial-services",
    name: "Commercial Services",
    short: "From exterior cladding to high level vacuuming. Big or small, we have you covered.",
    img: "high-level.jpg",
    icon: "building",
  },
  {
    slug: "emergency-cleaning",
    name: "Emergency Cleaning",
    short: "Rapid-response call-outs for unexpected or hazardous cleaning situations.",
    img: "before-after-driveway.jpg",
    icon: "alert-triangle",
  },
  {
    slug: "street-cleaning",
    name: "Street Cleaning",
    short: "Working in partnership with Birmingham City Council and Cleaner Greener Streets.",
    img: "before-after-roof.jpg",
    icon: "road",
  },
  {
    slug: "ipaf-hire",
    name: "IPAF Operative Hire",
    short: "IPAF approved MEWP operators with cherry picker and scissor lift hire.",
    img: "high-level.jpg",
    icon: "ladder",
  },
  {
    slug: "facility-services",
    name: "JJ Facility Services",
    short: "Our dedicated facilities arm for offices, sites and managed buildings.",
    img: "commercial-office.jpg",
    icon: "key",
  },
];

const otherServices = [
  "Render Cleaning", "House Cleaning", "High Level Cleaning", "SoftWashing",
  "End of Tenancy Cleaning", "Bungalow Roof Cleaning", "Gutter Cleaning",
  "House Washing", "Office Cleaning", "Conservatory Cleaning", "Signage Cleaning",
  "Litter Picking", "Machine Sweeping", "Cladding Cleaning", "Deep Cleaning",
];

const processSteps = [
  {
    n: "01",
    title: "Select your desired service",
    text: "Select from one of our 35 different services or packages. View our services page for a full list of services we provide.",
  },
  {
    n: "02",
    title: "Book in your desired services",
    text: "Book your services in for a day and time that is convenient for you. We will ask for some basic information, such as your full name, address, contact number and email.",
  },
  {
    n: "03",
    title: "The day of the cleaning",
    text: "A member of the team will come to your property, fully equipped to complete your desired service. After we have finished, you will receive an invoice via email or SMS.",
  },
  {
    n: "04",
    title: "The payment process",
    text: "After the clean, you can pay using cash, contactless, bank transfer, or over the phone. If you are going to be a regular customer, we can set you up on a direct debit payment plan.",
  },
];

const reviews = [
  { name: "Rama Pabathi", text: "Highly recommend, great service. Jake sorts the window cleaning and power washes for us and always does a brilliant job." },
  { name: "Emma McGuire", text: "Easy to book, friendly and professional. They even came back the same day when there was something extra to sort out." },
  { name: "Pervinder Kaur", text: "I am very pleased and grateful. Jake is so professional and my windows are absolutely gleaming." },
  { name: "Davinder Jandu", text: "Thank you Jake for such an amazing job. Our windows are sparkling and the whole place looks brand new." },
  { name: "Mangao Ruxi", text: "Great service! I hired JJ Cleaning after some renovation work and they left the place spotless." },
  { name: "Tawheed Ali", text: "Great service! I booked JJ Cleaning Services for various different jobs and every one was done to a high standard." },
  { name: "Jessica Sparkes", text: "A fantastic cleaning company. Jake cleaned our house this week and did a wonderful, thorough job." },
  { name: "Beryl Byrne", text: "Excellent service from booking through until job completed. Arrived at 9am sharp, exactly as promised." },
  { name: "Loren Lynch", text: "Highly recommend. Jake sorts the window washing and even power washes the bins. Nothing is too much trouble." },
  { name: "Bush", text: "Jake was very punctual, professional and did a great job with my garden and driveway." },
];

const accreditations = [
  { name: "IPAF", img: "badge-ipaf.png", desc: "International Powered Access Federation approved for safe work at height." },
  { name: "City & Guilds", img: "badge-city-guilds.png", desc: "Accredited training and qualifications in cleaning services." },
  { name: "IOSH", img: "badge-iosh.png", desc: "Institution of Occupational Safety and Health approved." },
  { name: "DBS Checked", img: "badge-dbs.png", desc: "All staff police vetted through the Disclosure & Barring Service." },
  { name: "Smas Worksafe", img: "badge-smas.png", desc: "Smas Worksafe registered for health and safety standards." },
  { name: "SSIP", img: "badge-ssip.png", desc: "Safety Schemes in Procurement approved." },
  { name: "ISO 45001", img: "badge-iso45001.png", desc: "Certified occupational health and safety management." },
  { name: "ISO 9001", img: "badge-iso9001.png", desc: "Certified quality management system." },
  { name: "SafeContractor", desc: "SSIP-recognised health and safety accreditation for contractors." },
  { name: "CHAS", desc: "CHAS approved contractor for health and safety compliance." },
  { name: "BESCA", desc: "Building Engineering Services Competence Assessment certified." },
  { name: "Public Liability", desc: "£10m Public Liability insurance cover on every job." },
  { name: "Employers Liability", desc: "£10m Employers Liability insurance for our whole team." },
  { name: "Waste Carrier Licence", desc: "Environment Agency registered waste carrier." },
  { name: "PAT Testing", desc: "All electrical equipment safety tested and certified." },
  { name: "COSHH Compliance", desc: "Safe control and handling of substances hazardous to health." },
];

const faqs = [
  { q: "How much should I pay for window cleaning?", a: "That would depend on the size of your house, how often you have your windows cleaned and the condition of the glass and frames. Initial cleans cost more than regular maintenance, and we offer monthly and bi-monthly options." },
  { q: "How much should I pay for carpet cleaning?", a: "For a standard 3-bedroom, 1-bathroom property with a living room and kitchen, pricing would start from £180.00 including stairs and landing." },
  { q: "Can I give my cleaner a key?", a: "Yes. All our cleaners have been vetted and can hold keys. A key receipt form is provided in the information pack upon request." },
  { q: "What is water fed pole window cleaning?", a: "This method uses purified water which doesn't use any harsh chemicals or detergents to clean windows safely and quickly, leaving them crystal clean once dry." },
  { q: "How do I change my information?", a: "Submit the Information Change Form. Please allow 3 to 5 business days for your request to be processed. For additional questions, submit a customer care support ticket." },
  { q: "I need my driveway cleaning, can you help?", a: "Yes, we provide both residential and commercial pressure washing services. We handle driveways from single car size to large industrial parking areas, requiring only an outdoor tap." },
  { q: "How can I pay for the cleaning service?", a: "For any of our cleaning services or products we can accept payment via cash, card or bank transfer. We carry contactless card machines on-site." },
  { q: "How do I know you are a professional company?", a: "We are a limited registered company, fully insured with public liability insurance. Risk assessments and method statements are available upon request." },
  { q: "How do I recognise your company?", a: "All our staff carry ID as well as wearing our uniforms, which display the company logo. Customised vehicles also carry our logo. Contact the office if you are unsure about anyone at your door." },
  { q: "Do you bring all your own equipment and supplies?", a: "Yes. Everything. We transport all tools and supplies in customised vehicles, so you never need to purchase or store materials." },
  { q: "How can I give you feedback?", a: "Contact us by phone, email or letter, or fill in the comments card form we leave after each visit. Feedback is also accepted via Trustpilot." },
  { q: "What surfaces can be pressure washed?", a: "Suitable surfaces include decking, patios, driveways, walkways, roofing, siding, concrete and brick. Unsuitable surfaces include asphalt shingles, stained wood, lead paint, windows, old mortar and gutters." },
  { q: "How often should I clean my windows?", a: "Frequency depends on location and foot traffic. High-traffic commercial properties benefit from monthly or bi-monthly cleaning. Office buildings typically need cleaning every six months." },
  { q: "When is best to pressure wash my driveway?", a: "For block paving, spring or summer is ideal after re-sanding, as colder, damper months prevent proper drying, especially for protective sealing." },
  { q: "Are you environmentally friendly?", a: "Most definitely. We use steam cleaning equipment to reduce chemical needs and supply environmentally friendly chemicals for use in green belt areas, close to water sources." },
  { q: "Do you use chemicals?", a: "We use steam cleaning when possible. For areas near water sources or conservation zones, we provide environmentally friendly chemical alternatives." },
  { q: "What areas do you cover?", a: "Service areas include Tyseley, Olton, Shirley, Sheldon, Acocks Green, Yardley, Hall Green, Birmingham, Billesley, Bordesley, Digbeth, Moseley, Small Heath, Sparkbrook, Stechford and surrounding areas." },
];

const areas = [
  "Tyseley", "Olton", "Shirley", "Sheldon", "Acocks Green", "Yardley",
  "South Yardley", "Yardley Wood", "Hall Green", "Billesley", "Bordesley",
  "Digbeth", "Moseley", "Small Heath", "Sparkbrook", "Stechford", "Solihull", "Birmingham",
];

const windowPrices = [
  // property, 4-weekly, 8-weekly, conservatory, extension, porch
  ["2 Bed Semi", "£16.00", "£18.00", "+£4.00", "+£2.00", "+£1.00"],
  ["3 Bed Semi", "£17.00", "£20.00", "+£4.00", "+£2.00", "+£1.00"],
  ["4 Bed Semi", "£20.00", "£23.00", "+£4.00", "+£3.00", "+£1.00"],
  ["5 Bed Semi", "£25.00", "£28.00", "+£4.00", "+£4.00", "+£1.00"],
  ["3 Bed Detached", "£18.00", "£24.00", "+£4.00", "+£3.00", "+£1.00"],
  ["4 Bed Detached", "£20.00", "£22.00", "+£4.00", "+£4.00", "+£1.00"],
  ["5 Bed Detached", "£27.00", "£31.00", "+£4.00", "+£5.00", "+£1.00"],
];

const servicePrices = [
  { name: "Conservatory Roof Cleaning", lines: [["Residential", "£4.00 per panel"], ["Commercial", "£6.00 per panel"]] },
  { name: "Fascia & Soffit Cleaning", lines: [["Residential full exterior", "£80.00"], ["Commercial", "from £110.00"]] },
  { name: "Carpet Cleaning", lines: [["Small room (4m x 4m)", "£35.00"], ["Stairs & landing", "£20.00"], ["Commercial", "£4.00 per m²"]] },
  { name: "General Cleaning", lines: [["Residential", "£15.00 per hour"], ["Commercial", "£18.00 per hour"]] },
  { name: "Pressure Washing", lines: [["Block pavement", "£1.50 per metre"], ["Tarmac / slabs", "£0.80 per metre"], ["Minimum service charge", "£25.00"]] },
  { name: "Gutter Cleaning", lines: [["Residential", "£2.50 per metre"], ["Commercial", "£3.50 per metre"]] },
  { name: "Upholstery Cleaning", lines: [["Armchair", "£30.00"], ["Dining chair", "£20.00"], ["2-seater sofa", "£45.00"], ["3-seater sofa", "£55.00"]] },
  { name: "After Building & End of Tenancy", lines: [["Residential", "£22.00 per hour"], ["Commercial", "£28.00 per hour"]] },
];

const valetPackages = [
  {
    name: "Exterior Valet", price: "From £15", tag: "Entry level",
    items: ["Pre-wash & snow foam", "Hand wash", "Wheels & arches cleaned", "Glass cleaning", "Pressure wash of whole exterior"],
  },
  {
    name: "Interior Valet", price: "From £25", tag: "Entry level",
    items: ["Vacuuming throughout", "Dash & door plastic cleaning", "Steam cleaning", "Mats brushed and cleaned", "Glass & mirror cleaning", "FREE air freshener"],
  },
  {
    name: "Full Valet", price: "From £60", tag: "Most popular", featured: true,
    items: ["Pre-wash & snow foam", "Hand wash", "Wheels & arches cleaned", "Pressure wash of whole exterior", "Plastic dusting & cleaning", "Vacuuming throughout", "Mats brushed and cleaned", "Glass & mirror cleaning", "FREE air freshener"],
  },
  {
    name: "Deep Clean Valet", price: "From £110", tag: "Full restoration",
    items: ["Everything in Full Valet", "Glass spray wax", "Undercarriage cleaning", "Air vent cleaning", "Upholstery & carpet cleaning", "FREE air freshener"],
  },
];

const valetAddons = [
  { group: "Exterior add-ons", items: [["Rain repellent", "from £10.00"], ["Glass spray wax", "from £10.00"], ["Tyre shine", "from £8.00"], ["Engine bay clean", "from £40.00"]] },
  { group: "Interior add-ons", items: [["Upholstery cleaning", "from £20.00"], ["Deep leather cleaning", "from £15.00"], ["Stain removal", "from £11.50"], ["Pet hair removal", "from £10.00"]] },
];

const valetSubscriptions = [
  { name: "Mini Valet Maintenance", price: "£20/month", note: "+ £10 first clean fee", items: ["Wheels & arches cleaned", "Pre-wash / snow foam", "Hand wash", "Glass cleaning"] },
  { name: "Full Valet Maintenance", price: "£50/month", note: "+ £10 first clean fee", items: ["Everything in Mini", "Plastics dusted and cleaned", "Vacuuming throughout", "Mats brushed", "Mirrors cleaned", "Complimentary air freshener"] },
];

const shopPackages = [
  { name: "Internal Package", was: "£50.00", price: "£40.00" },
  { name: "External Package", was: "£60.00", price: "£50.00" },
  { name: "Commercial Package", was: "£80.00", price: "£70.00" },
  { name: "The Works Package", was: "£160.00", price: "£150.00" },
  { name: "Weed & Property Maintenance Plan (2 months)", was: "£60.00", price: "From £50.00" },
  { name: "The Full Pressure Washing Pack", was: "", price: "From £100.00" },
];

const coupons = [
  { title: "Multi-Service Discount", value: "10% off", desc: "10% discount off your total bill when you order any online services. Applies to both new and existing clients.", code: "Email us with subject line [Offer 3] after booking" },
  { title: "Referral Reward", value: "10% off", desc: "10% discount off your total bill when you refer a friend. Available to all customers.", code: "Use the referral system on our Recommend Us page" },
  { title: "Maid Cleaning Services", value: "15% off", desc: "15% discount off our hourly rate for maid cleaning services.", code: "Code: Clean-Property-24 at checkout" },
  { title: "Blue Light Discount", value: "10% off", desc: "10% discount on emergency services for eligible key workers and blue light card holders.", code: "Code: Blue-Light" },
];

const locations = [
  { city: "Birmingham", status: "Head Office", lines: ["JJ Group (UK) LTD", "77 Roma Road, Tyseley", "Birmingham B11 2JH"], email: "Info@JJCleaningServices.uk", phone: "0121 751 8515", note: "Visit by appointment only" },
  { city: "Manchester", status: "Open", lines: ["JJ Group (UK) LTD", "Peter House, Oxford Street", "Manchester M1 5AN"], email: "Manchester@JJCleaningServices.uk", phone: "0121 751 8515 (option 2)" },
  { city: "Coventry", status: "Coming soon", lines: ["JJ Group (UK) LTD", "3 Warwick Road, The Quadrant", "Coventry CV1 2DY"], email: "Coventry@JJCleaningServices.uk", phone: "0121 751 8515 (option 3)" },
  { city: "Wolverhampton", status: "Coming soon", lines: ["JJ Group (UK) LTD", "23 Cleveland Street, Mander Centre", "Wolverhampton WV1 3HT"], email: "Wolverhampton@JJCleaningServices.uk", phone: "0121 751 8515 (option 4)" },
  { city: "Dudley", status: "Coming soon", lines: ["Opening soon"], email: "Info@JJCleaningServices.uk", phone: "0121 751 8515" },
];

const group = [
  { name: "JJ Group (UK)", img: "group-logo.png", url: "https://jjgroupuk7.wixsite.com/jj-group-uk", desc: "Our parent trading group." },
  { name: "JJ Maid Services", img: "maid-services.png", url: "https://jjgroupuk.wixsite.com/jj-maid-services", desc: "Domestic maid and housekeeping services." },
  { name: "JJ Local Support", img: "local-support.png", url: "https://jjlocalsupport.getsoapy.com/", desc: "Local community support services." },
];

module.exports = {
  contact, services, otherServices, processSteps, reviews, accreditations,
  faqs, areas, windowPrices, servicePrices, valetPackages, valetAddons,
  valetSubscriptions, shopPackages, coupons, locations, group,
};
