console.log("data.json")
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        var header = document.querySelector("header");
        if (header) {
            header.innerHTML = "<img src='img/favicon.png' alt='Logo' class='logo'><h1>M'Tunes</h1>";
        }

        var container = document.querySelector(".liste-musiques");
        container.innerHTML = ""; // Nettoyer les blocs existants

        data.forEach((musique, index) => {
            var section = document.createElement("section");
            section.classList.add("music-item");
            section.style.backgroundImage = `url('${musique.blocFonds}')`;

            section.innerHTML = `
                <img src="${musique.cover}" alt="Cover" class="cover">
                <div class="music-content">
                    <div class="text-box">
                        <h2>${musique.musique}</h2>
                        <p>${musique.explication}</p>
                    </div>
                    <audio id="audio-${index}" src="${musique.audioSrc}" class="audio-player" style="display: none;"></audio>
                    <button class="play-pause" data-id="${index}">⏵ Lecture</button>
                    <a href="${musique.urlSpotify}">
                        <img src="img/spotify.png" alt="Spotify" class="icon-spotify">
                    </a>
                    <a href="${musique.urlYoutube}">
                        <img src="img/youtube.png" alt="YouTube" class="icon-youtube">
                    </a>
                    <button class="show-credits" data-id="${index}">Crédits</button>
                    <div id="credits-${index}" class="credits">
                        <h3>Crédits</h3>
                        ${generateCreditsHtml(musique.credits)}
                        <button class="close-credits" data-id="${index}">Fermer</button>
                    </div>
                </div>`;
            container.appendChild(section);
        });

       
        attachPlayPauseEvents();
        
// fermer les crédits
document.querySelectorAll(".close-credits").forEach(button => {
    button.addEventListener("click", function() {
      var id = button.getAttribute("data-id");
      var credits = document.getElementById(`credits-${id}`);
      // masquer les crédits
      credits.style.display = "none";
    });
  });
  

document.querySelectorAll('.credits').forEach(credits => {
    credits.style.display = 'none';  // masquer les crédits par défaut
  });
  

  document.querySelectorAll(".show-credits").forEach(button => {
    button.addEventListener("click", function() {
      var id = button.getAttribute("data-id");
      var credits = document.getElementById(`credits-${id}`);
      // ajouter la classe "show" pour afficher les crédits
      credits.classList.add('show');
      credits.style.display = 'block'; 
    });
  });
  
  // fermer les crédits
  document.querySelectorAll(".close-credits").forEach(button => {
    button.addEventListener("click", function() {
      var id = button.getAttribute("data-id");
      var credits = document.getElementById(`credits-${id}`);
      // retirer la classe "show" pour masquer les crédits
      credits.classList.remove('show');
      credits.style.display = 'none'; // masquer les crédits
    });
  });
  
  // fonction pour générer les crédits html
  function generateCreditsHtml(credits) {
    var html = '';
    for (var key in credits) {
      if (typeof credits[key] === 'object') {
        html += '<p><strong>' + key + ':</strong> ' + credits[key].join(', ') + '</p>';
      } else {
        html += '<p><strong>' + key + ':</strong> ' + credits[key] + '</p>';
      }
    }
    return html;
  }
  
  // fonction pour bouttons de lecture/pause
        function attachPlayPauseEvents() {
            var playPauseButtons = document.querySelectorAll('.play-pause');
            var audioElements = document.querySelectorAll('.audio-player');

            playPauseButtons.forEach(function (button, index) {
                button.addEventListener('click', function () {
                    var audio = audioElements[index];

                    audioElements.forEach(function (otherAudio, i) {
                        if (i !== index) {
                            otherAudio.pause();
                            playPauseButtons[i].textContent = '⏵ Lecture';
                        }
                    });

                    if (audio.paused) {
                        audio.play();
                        button.textContent = '⏸ Pause';
                    } else {
                        audio.pause();
                        button.textContent = '⏵ Lecture';
                    }
                });
            });
        }
    });
  
        // Ajouter un gestionnaire d'événement pour la prévisualisation
        var formulaire = document.getElementById("formulaireMusique");
    
        formulaire.addEventListener("input", function () {
            // Récupérer les champs du formulaire
            var userEmail = document.getElementById("userEmail").value;
            var artisteTitre = document.getElementById("artisteTitre").value;
            var descriptionMusique = document.getElementById("descriptionMusique").value;
            var audioUrl = document.getElementById("audioUrl").value;
            var coverImage = document.getElementById("coverImage").files[0];
    
            // Mettre à jour les éléments de prévisualisation
            var userTitre = document.getElementById("userTitre");
            var userAudioPreview = document.getElementById("userAudioPreview");
            var userDescription = document.getElementById("userDescription");
            var userCoverPreview = document.getElementById("userCoverPreview");
    
            userTitre.textContent = artisteTitre;
            userAudioPreview.src = audioUrl;
            userDescription.textContent = descriptionMusique;
    
            // Charger l'image de couverture si elle est disponible
            if (coverImage) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    userCoverPreview.src = e.target.result;
                };
                reader.readAsDataURL(coverImage);
            } else {
                userCoverPreview.src = "#";
            }
        });
  


    var apiUrl =
  'https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=student123&' +
  'courriel=' + encodeURIComponent(userEmail) + '&' +
  'message=' + encodeURIComponent(userFeedback);
console.log(apiUrl);

fetch(apiUrl)
  .then(function (serverResponse) {
    return serverResponse.json();
  })
  .then(function (responseData) {
    console.log("Réponse reçue depuis le serveur : ");
    console.log(responseData);
    displayPopupWindow();
  });
