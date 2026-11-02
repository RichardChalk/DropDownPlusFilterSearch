// En array med 10 kunder.
// Varje kund har Name, Company och Region.
const customers = [
  { name: "Anna", company: "IKEA", region: "North" },
  { name: "Erik", company: "Volvo", region: "South" },
  { name: "Sara", company: "Spotify", region: "East" },
  { name: "Johan", company: "Ericsson", region: "West" },
  { name: "Maria", company: "H&M", region: "North" },
  { name: "Peter", company: "Scania", region: "South" },
  { name: "Emma", company: "Klarna", region: "East" },
  { name: "David", company: "Electrolux", region: "West" },
  { name: "Linda", company: "Telia", region: "North" },
  { name: "Oscar", company: "ABB", region: "South" },
];

// Hämta HTML-elementen.
const regionFilter = document.querySelector("#regionFilter");
const customerList = document.querySelector("#customerList");
// Hämta det nya sökfältet så att vi kan läsa vad användaren skriver.
const nameSearch = document.querySelector("#nameSearch");

// Funktion som visar kunder på sidan.
function displayCustomers(customerArray) {
  // Töm listan innan nya kunder visas.
  customerList.innerHTML = "";

  // Loopa igenom kunderna.
  customerArray.forEach((customer) => {
    // Skapa ett HTML-kort för varje kund.
    const customerCard = document.createElement("div");
    customerCard.classList.add("customer");

    customerCard.innerHTML = `
      <h3>${customer.name}</h3>
      <p>Company: ${customer.company}</p>
      <p>Region: ${customer.region}</p>
    `;

    // Lägg till kortet på sidan.
    customerList.appendChild(customerCard);
  });
}

// Filtrera kunderna både efter vald region och inskrivet namn.
function filterCustomers() {
  // Läs vilken region som är vald i dropdown-menyn.
  const selectedRegion = regionFilter.value;

  // Läs texten i sökfältet och gör den till små bokstäver.
  // trim() tar bort eventuella mellanslag i början och slutet.
  const searchText = nameSearch.value.trim().toLowerCase();

  // filter() går igenom alla kunder och behåller dem som matchar båda villkoren.
  const filteredCustomers = customers.filter((customer) => {
    // "All" betyder att alla regioner är tillåtna.
    const matchesRegion = selectedRegion === "All" || customer.region === selectedRegion;

    // includes() hittar även delar av ett namn, tex. "an" i "Anna".
    // toLowerCase() gör att stora och små bokstäver behandlas lika.
    const matchesName = customer.name.toLowerCase().includes(searchText);

    // En kund visas bara om både region och namn matchar.
    return matchesRegion && matchesName;
  });

  // Visa kunderna som uppfyller båda sökvillkoren.
  displayCustomers(filteredCustomers);
}

// Kör filtreringen när användaren byter region.
regionFilter.addEventListener("change", filterCustomers);

// Kör filtreringen direkt när användaren skriver eller tar bort text.
nameSearch.addEventListener("input", filterCustomers);

// Visa alla kunder när sidan öppnas.
displayCustomers(customers);
