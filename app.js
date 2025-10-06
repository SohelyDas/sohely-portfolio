document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const contentSection = document.getElementById('content');
  const contentGrid = document.getElementById('contentGrid');
  const contentTitle = document.getElementById('contentTitle');
  const categoryBtns = document.querySelectorAll('.category-btn');

  const sampleData = {
    painting: [
      { title: "Sunlit Field", img: "image/sample1.jpg" },
      { title: "Blue Window", img: "image/sample2.jpg" },
      { title: "Quiet Pond", img: "image/sample3.jpg" }
    ],
    theatre: [
      { title: "Set Design — Act I", img: "image/sample4.jpg" },
      { title: "Costume Sketch", img: "image/sample5.jpg" }
    ],
    story: [
      { title: "Short Story: The Lantern", img: "image/sample6.jpg" },
      { title: "Poem: Rain on Canvas", img: "image/sample7.jpg" }
    ]
  };

  function clearContentGrid() {
    if (contentGrid) contentGrid.innerHTML = '';
  }

  function populateContent(category) {
    if (!contentGrid || !contentTitle) return;
    contentTitle.textContent = {
      painting: "Paintings",
      theatre: "Theatre",
      story: "Story Writing"
    }[category] || "Works";
    clearContentGrid();

    const items = sampleData[category] || [];
    if (items.length === 0) {
      contentGrid.innerHTML = '<p class="col-span-full text-center">No items yet.</p>';
      return;
    }

    items.forEach(it => {
      const card = document.createElement('div');
      card.className = 'rounded-lg overflow-hidden shadow-lg bg-[#0b1220]';
      card.innerHTML = `
        <div class="w-full h-48 bg-gray-800 flex items-center justify-center">
          <img src="${it.img}" alt="${it.title}" class="object-cover w-full h-full" onerror="this.style.display='none'">
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">${it.title}</h3>
        </div>
      `;
      contentGrid.appendChild(card);
    });
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      if (!category) return;
      if (contentSection) contentSection.classList.remove('hidden');
      populateContent(category);
      contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  if (location.hash && location.hash === "#content") {
    if (contentSection) contentSection.classList.remove("hidden");
  }
});