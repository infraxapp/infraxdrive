/* ================= EDIT HERE =================
   Brand, contact and fleet. ADD A CAR = add one object to fleet (id must be unique; image + image-640.webp in img/fleet/).
   Fields: id, name, model, category (SUV/4x4/Sedan/Hatchback/Luxury/MUV/EV...), seats, fuel, trans, drive, price (₹/day or null), image; optional cutout = transparent-background photo used on the fleet page.
   price: ₹/day number, or null for "On request".
   email / address: leave "" to hide them; they render only when filled in.
   social: Instagram/YouTube icons render only when set to a real URL ("" or "#" = hidden). */
window.CONFIG={
 brand:"4X4 Drive",
 whatsapp:"919988226648",
 phone:"+91 99882 26648",
 email:"",
 address:"",
 hours:"Bookings 8 AM – 10 PM",
 social:{instagram:"",youtube:""},
 fleet:[
  {id:"suv7",name:"Ford Endeavour",model:"Titanium 4x4 AT",category:"SUV",type:"7-seater Premium SUV",short:"7-seater",image:"img/fleet/suv7.webp",cutout:"img/fleet/suv7-cut.webp",examples:"Ford Endeavour or similar",seats:7,trans:"Automatic",drive:"4x4",fuel:"Diesel",price:10000,
   line:"Three rows, real luggage space and highway manners. The one for families, weddings and long drives.",uses:["Family trips","Weddings","Airport + luggage","Corporate offsites"]},
  {id:"offroader",name:"Mahindra Thar",model:"LX Hard Top",category:"4x4",studio:true,type:"4x4 Off-roader",short:"4x4",image:"img/fleet/offroader.webp",examples:"Mahindra Thar or similar",seats:4,trans:"Manual",drive:"4x4",fuel:"Diesel",roof:"Hard top",price:null,
   line:"Short overhangs, low-range gearbox, nothing it's scared of. Built for the hills and the weekend trail.",uses:["Hills","Off-road weekends","Rajasthan dunes","Road trips for two"]}
 ]
};
