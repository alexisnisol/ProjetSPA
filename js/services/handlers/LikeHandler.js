export function setupLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-button');
        likeButtons.forEach(button => {
            button.addEventListener('click', toggleLike);
        });
}

function toggleLike(event) {
    const likeButton = event.target;
    const isLiked = likeButton.textContent === "❤️";

    likeButton.textContent = isLiked ? "🤍" : "❤️";

    console.log(isLiked ? "Retiré des favoris" : "Ajouté aux favoris");
}