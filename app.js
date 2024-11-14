let currentIndex = 0;

function moveSlide(direction) {
    const images = document.querySelector(`.carousel-images`);
    const totalImages = images.children.length;

    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    const offset = -currentIndex * 100;
    images.style.transform = `translateX(${offset}%)`;
}

function toggleImages() {
    const staticImages = document.querySelector(`.static`);
    const carouselImages = document.querySelector(`.carousel`);
    staticImages.classList.toggle(`hidden`);
    carouselImages.classList.toggle(`hidden`);
}

function calculatePayment() {
    const homePrice = parseFloat(document.getElementById(`homePrice`).value);
    const downPaymentPercentage = parseFloat(document.getElementById(`downPayment`).value) / 100;
    const interestRate = parseFloat(document.getElementById(`interestRate`).value) / 100 / 12;
    
    const downPayment = homePrice * downPaymentPercentage;
    const loanAmount = homePrice - downPayment;

    const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -30 * 12));
    
    document.getElementById(`monthlyPayment`).innerText = `Your estimated payment is $${monthlyPayment.toFixed(2)} per month`;
}



fetch(`data.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok`);
                }
                return response.json();
            })
            .then(jsonData => {

                let url = new URL(window.location.href);
                let property = url.searchParams.get("property");
                console.log(property);

                document.getElementById("Image1").src = `/images/${property}/01.jpg`;
                document.getElementById("Image2").src = `/images/${property}/02.jpg`;
                document.getElementById("Image3").src = `/images/${property}/03.jpg`;
                document.getElementById("Image4").src = `/images/${property}/04.jpg`;
                document.getElementById("Image5").src = `/images/${property}/05.jpg`;
                document.getElementById("Image6").src = `/images/${property}/06.jpg`;
                document.getElementById("Image7").src = `/images/${property}/07.jpg`;
                document.getElementById("Image8").src = `/images/${property}/08.jpg`;
                document.getElementById("Image9").src = `/images/${property}/09.jpg`;
                document.getElementById("Image10").src = `/images/${property}/10.jpg`;
                document.getElementById("Image11").src = `/images/${property}/11.jpg`;
                document.getElementById("Image12").src = `/images/${property}/12.jpg`;
                document.getElementById("Image13").src = `/images/${property}/13.jpg`;
                document.getElementById("Image14").src = `/images/${property}/14.jpg`;
                document.getElementById("Image15").src = `/images/${property}/15.jpg`;
                document.getElementById("Image16").src = `/images/${property}/16.jpg`;
                document.getElementById("Image17").src = `/images/${property}/17.jpg`;
                document.getElementById("Image18").src = `/images/${property}/18.jpg`;
                document.getElementById("Image19").src = `/images/${property}/19.jpg`;

                document.getElementById("StaticImage1").src = `/images/${property}/01.jpg`;
                document.getElementById("StaticImage2").src = `/images/${property}/02.jpg`;
                document.getElementById("StaticImage3").src = `/images/${property}/03.jpg`;

                document.getElementById("Logo").src = `/images/${property}/logo.jpg`;



                document.getElementById("Address").innerHTML = jsonData[`${property}`][`Address`]; 
                document.getElementById("price").innerHTML = jsonData[`${property}`][`Total Cost`]; 
                document.getElementById("desc").innerHTML = jsonData[`${property}`][`Long Description`]; 

                document.getElementById("info-bed").innerHTML = jsonData[`${property}`][`Short Description`]["beds"]; 
                document.getElementById("info-bath").innerHTML = jsonData[`${property}`][`Short Description`]["baths"]; 
                document.getElementById("info-footage").innerHTML = jsonData[`${property}`][`Short Description`]["sqft"]; 

                document.getElementById("stats-parking").innerHTML = jsonData[`${property}`][`Highlights`]["Parking"]; 
                document.getElementById("stats-outdoor").innerHTML = jsonData[`${property}`][`Highlights`]["Outdoor"]; 
                document.getElementById("stats-ac").innerHTML = jsonData[`${property}`][`Highlights`]["AC"]; 
                document.getElementById("stats-hoa").innerHTML = jsonData[`${property}`][`Highlights`]["HOA"]; 
                document.getElementById("stats-listed").innerHTML = jsonData[`${property}`][`Highlights`]["Price/sqft"]; 
                document.getElementById("stats-sqft").innerHTML = jsonData[`${property}`][`Highlights`]["Listed"];

                document.getElementById("basement-stats").innerHTML = jsonData[`${property}`][`Details`]["Interior"]["Basement"]; 
                document.getElementById("room-stats").innerHTML = jsonData[`${property}`][`Details`]["Interior"]["Rooms"]; 
                document.getElementById("type-stats").innerHTML = jsonData[`${property}`][`Details`]["Interior"]["Types of rooms"]; 
                document.getElementById("bedroom-stats").innerHTML = jsonData[`${property}`][`Details`]["Interior"]["Bedrooms"]; 
                document.getElementById("bathroom-stats").innerHTML = jsonData[`${property}`][`Details`]["Interior"]["Bathrooms"]; 
                document.getElementById("full-bathroom-stats").innerHTML = jsonData[`${property}`][`Details`]["Interior"]["Bathrooms (full)"]; 
                document.getElementById("living-stats").innerHTML = jsonData[`${property}`][`Details`]["Interior"]["Dimensions & Layout"]; 

                document.getElementById("map").src = jsonData[`${property}`][`map1`]; 

                document.getElementById("infoYear").innerHTML = jsonData[`${property}`][`Year`]; 
                document.getElementById("infoTax").innerHTML = jsonData[`${property}`][`Property Tax`]; 
                document.getElementById("infoAssesment").innerHTML = jsonData[`${property}`][`Assessment`]; 

                document.getElementById("homePrice").value = jsonData[`${property}`][`Total Cost Int`]; 

                const similarListingsContainer = document.getElementById("similar-listings");
                similarListingsContainer.innerHTML = ""; 

                for (const [key, value] of Object.entries(jsonData)) {
                    if (key !== property) { 
                        const listingElement = document.createElement("div");
                        listingElement.classList.add("listing");

                        listingElement.innerHTML = `
                            <img src="/images/${key}/01.jpg" alt="${value["Address"]}">
                            <h3>${value["Address"]}</h3>
                            <p>Price: ${value["Total Cost"]}</p>
                            <p>${value["Short Description"]["beds"]} Beds, ${value["Short Description"]["baths"]} Baths</p>
                            <a href="/?property=${key}">View Listing</a>
                        `;

                        similarListingsContainer.appendChild(listingElement);
                    }
                }
            })
            .catch(error => {
                console.error(`Error fetching the JSON file:`, error);
            });