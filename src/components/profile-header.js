import underlineSrc from "../assets/underline.svg";

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc, jobTitle, companyName } = data;
  const headerNode = document.querySelector("#profile-header .profile-header");
  const profileAvatarNode = headerNode.querySelector("img");
  const profileAvatarDiv = headerNode.querySelector(".profile-avatar");
  const nameNode = headerNode.querySelector(".profile-info .profile-info-name");
  const underlineNode = headerNode.querySelector(".profile-underline");
  const infoNode = headerNode.querySelector(".page-paragraph");

  underlineNode.setAttribute("src", underlineSrc);

  nameNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--half"
  );

  infoNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--quarter"
  );
  infoNode.innerHTML = `${jobTitle} @ ${companyName}`;

  nameNode.innerHTML = `${firstName} ${lastName}`;
  nameNode.appendChild(underlineNode);
  profileAvatarNode.src = avatarSrc;
  profileAvatarNode.setAttribute("aria-label", `${firstName} ${lastName}`);

  if (!avatarSrc) {
    profileAvatarNode.remove();
    const initials = document.createElement("div");
    initials.innerHTML = firstName[0] + lastName[0];
    profileAvatarDiv.appendChild(initials);
  }
};
