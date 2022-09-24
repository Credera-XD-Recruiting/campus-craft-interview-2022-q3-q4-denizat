import { removeChildNodes } from "../utils";

/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const {
    authorFirstName,
    authorLastName,
    authorAvatarSrc,
    jobTitle,
    companyName,
    post,
    publishDate,
    city,
    state,
  } = data;
  const templateId = "profile-post-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const authorName = clone.querySelector(".post-author-info .page-paragraph");
  const jobDesc = clone.querySelector(".post-author-info .page-micro");
  const postNode = clone.querySelector(".post-content");
  const avatarNode = clone.querySelector(".post-author-avatar");

  authorName.innerHTML = `${authorFirstName} ${authorLastName}`;
  let dateString = new Date(publishDate).toLocaleDateString();
  jobDesc.innerHTML = `${jobTitle} @ ${companyName} <br> Published on ${dateString} from ${city}, ${state}`;
  postNode.innerHTML = post;

  if (authorAvatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = authorAvatarSrc;
    avatarImg.setAttribute(
      "aria-label",
      `${authorFirstName} ${authorLastName}`
    );
    avatarNode.appendChild(avatarImg);
  } else {
    const initials = document.createElement("div");
    initials.innerHTML = authorFirstName[0] + authorLastName[0];
    avatarNode.appendChild(initials);
  }

  return clone;
};

const chevron = document.getElementById("chevron");
let chevronOpen = false;

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generatePinnedPostsFromTemplate = (resultsData) => {
  const pinnedPostsList = document.querySelector(
    "#profile-posts .profile-post-results"
  );

  removeChildNodes(pinnedPostsList);

  chevron.onclick = () => {
    window.getSelection().removeAllRanges(); // with out this, rapid clicks cause the pinned post to be highlighted
    if (chevronOpen) {
      removeChildNodes(pinnedPostsList);
      chevron.classList.remove("profile-posts-chevron-transform");
    } else {
      chevron.classList.add("profile-posts-chevron-transform");
      if (resultsData.pinnedPost) {
        const postNode = generateCardNode(resultsData.pinnedPost);
        pinnedPostsList.appendChild(postNode);
      }
    }
    chevronOpen = !chevronOpen;
  };
};
