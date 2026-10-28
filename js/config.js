/* ================= EDIT HERE =================
   Brand, contact and fleet. Add a car category = add one object to fleet.
   price: ₹/day number, or null for "On request". ALL prices are PLACEHOLDERS.
   Contact details below are PLACEHOLDERS too. */
window.CONFIG={
 brand:"InfraX Drive",
 whatsapp:"919988226648",
 phone:"+91 99882 26648",
 email:"hello@example.com",          // placeholder
 address:"Sector XX, Gurugram, Haryana", // placeholder
 hours:"Bookings 8 AM – 10 PM · Road support 24×7",
 fleet:[
  {id:"hatchback",type:"Hatchback",image:"img/fleet/hatchback.webp",examples:"Swift, i20 or similar",seats:5,trans:"Manual",fuel:"Petrol",price:1800,line:"Easy in traffic. Easy on fuel."},
  {id:"sedan",type:"Sedan",image:"img/fleet/sedan.webp",examples:"City, Verna or similar",seats:5,trans:"Automatic",fuel:"Petrol",price:2800,line:"Quiet cabin. Big boot. Highway calm."},
  {id:"suv",type:"SUV",image:"img/fleet/suv.webp",examples:"Creta, Seltos or similar",seats:5,trans:"Automatic",fuel:"Diesel",price:3800,line:"High seat, real ground clearance."},
  {id:"electric",type:"Electric",image:"img/fleet/electric.webp",examples:"Nexon EV, MG Windsor EV or similar",seats:5,trans:"Automatic",fuel:"Electric",range:"~300 km",price:3200,line:"Silent, quick, zero tailpipe. City and short highway runs."},
  {id:"muv",type:"7-seater MUV",image:"img/fleet/muv.webp",examples:"Innova Crysta, XUV700 or similar",seats:7,trans:"Automatic",fuel:"Diesel",price:5000,line:"The whole family. The whole luggage."},
  {id:"offroad",type:"4x4 / Off-road",image:"img/fleet/offroad.webp",examples:"Scorpio-N 4x4, Gurkha or similar",seats:4,trans:"Manual",fuel:"Diesel",price:null,line:"For roads that stop being roads."},
  {id:"luxury",type:"Luxury",image:"img/fleet/luxury.webp",examples:"Fortuner, E-Class or similar",seats:7,trans:"Automatic",fuel:"Diesel",price:null,line:"For the arrival that matters."}
 ]
};
