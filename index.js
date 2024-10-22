const url = "https://feeds.gamepix.com/v2/json?sid=653E4&pagination=96&page=1";

fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        const gameContainer = document.getElementById("game-container");
        const games = data.items || [];
        
        let i = 0
        games.forEach((game) => {
            const add_div = document.createElement('div')
            add_div.className = "game card";
            add_div.style = "width: 18rem;";
            add_div.innerHTML = `<ins data-ad-format="auto" class="adsbygoogle"
data-ad-client="ca-pub-3150475895003837"
data-adsbygoogle-status="done"
style="display: block; margin: auto; background-color: transparent; height: 100px; width: 100%;"
data-ad-status="filled">
<div id="ad-container" tabindex="0" title="Advertisement" aria-label="Advertisement"
style="border: none; height: 100px; width: 100%; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-block; overflow: visible;">
<iframe id="ad-iframe" name="ad-iframe" style="left:0; position:absolute; top:0; border:0; width:100%; height:100px;"
    sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
    width="600" height="300" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"
    src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-3150475895003837&amp;h=300&amp;slotname=7709628385&amp;w=600&amp;rafmt=11&amp;format=600x300&amp;url=https://chaoreex.exblog.jp/&amp;host=ca-host-pub-8544321996124660&amp;"
    data-google-container-id="a!2" data-load-complete="true"></iframe>
</div>
</ins>`
            const gameDiv = document.createElement("div");
            gameDiv.className = "game card";
            gameDiv.style = "width: 18rem;";
            gameDiv.innerHTML = `
                <img class="card-img-top" src="${game.banner_image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                 
                    </div>
                    `;
                    // <div class="btn btn-primary" onclick="on_play_btn_clicked(game.url)">Play</div>
            let button = document.createElement('div')
            button.innerText = 'Play'
            button.className = "btn btn-primary"
            button.onclick = ()=>on_play_btn_clicked(game)
            gameDiv.getElementsByClassName('card-body').item(0).appendChild(button)
            gameContainer.appendChild(gameDiv);
            i++;
            if(i%3 == 0){
                gameContainer.appendChild(add_div);
                console.log(`div aded no: ${i}`)
            }
        });
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });

function on_play_btn_clicked(game) {
    console.log(game);
    let modal = document.getElementById("myModal");
    let content = modal.getElementsByClassName("modal-content").item(0);
    modal.getElementsByClassName("modal-dialog").item(0).style = 'display: inline: block;'

    let newContent = document.createElement("div");
    newContent.className = 'frame'
    newContent.style = "width: 100% ;height: 100vh"
    newContent.innerHTML = `
    <iframe src="${game.url}" style="height: 100%; width:100%" title="${game.title}"></iframe>
    `;
    
    content.innerHTML = "";
    console.log(newContent.getElementsByClassName('gamepix-logo').item(0))
    content.append(newContent);
    $("#myModal").modal("show");

    setTimeout(()=>{
        document.getElementById("myModal").style = 'display: flex !important;';
    }, 1000)
}
