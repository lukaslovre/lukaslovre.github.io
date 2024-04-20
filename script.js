// NEW
const UPDATE_INTERVAL = 60000;
const END_OF_SCHEDULE = new Date("2024-04-21T24:00:00");

const performanceSchedule = getPerformanceSchedule();
updatePerformances(performanceSchedule, "delta");
setInterval(() => updatePerformances(performanceSchedule, "delta"), UPDATE_INTERVAL);

const inputContainer = document.getElementById("input-container");
inputContainer.addEventListener("input", (e) => {
  const inputValue = e.target.value;
  updatePerformances(performanceSchedule, inputValue);
});

function getPerformanceSchedule() {
  return [
    {
      time: new Date("2024-04-20T18:30:00"),
      artist: "ulaz",
      image: "",
    },
    {
      time: new Date("2024-04-20T19:00:00"),
      artist: "mrzimteluka",
      image: "https://i.ytimg.com/vi/qBIZcmyqFjs/maxresdefault.jpg",
    },
    {
      time: new Date("2024-04-20T19:15:00"),
      artist: "shtosmo",
      image: "https://glazba.hr/wp-content/uploads/2022/10/DSC01758-920x613.jpg",
    },
    {
      time: new Date("2024-04-20T19:30:00"),
      artist: "tej x špiro",
      image:
        "https://glazba.hr/wp-content/uploads/2023/09/384480151_1399540740602702_3941090751914044608_n-e1695882262711.jpeg",
    },
    {
      time: new Date("2024-04-20T19:45:00"),
      artist: "podočnjaci",
      image: "https://glazba.hr/wp-content/uploads/2021/10/Podocnjaci-1-1030x632.jpg",
    },
    {
      time: new Date("2024-04-20T20:10:00"),
      artist: "krešo i žuvi",
      image:
        "https://dalmatinskiportal.hr/sadrzaj/vijesti/velika/2015-03-07-01-32-1701-.jpg",
    },
    {
      time: new Date("2024-04-20T20:35:00"),
      artist: "ttm",
      image:
        "https://cdns-images.dzcdn.net/images/cover/eeeb30f1b797e37022a62b2c123e4cff/264x264.jpg",
    },
    {
      time: new Date("2024-04-20T21:05:00"),
      artist: "mimi mercedez",
      image:
        "https://www.muzika.hr/wp-content/uploads/2023/09/26841102_1651862124860473_3426593192971901259_o.jpg",
    },
    {
      time: new Date("2024-04-20T21:35:00"),
      artist: "bore balboa",
      image:
        "https://www.muzika.hr/wp-content/uploads/2023/01/Bore-Balboa-Promo-Photo01-cc-Andro-Tasovac_webQ.jpg",
    },
    {
      time: new Date("2024-04-20T22:00:00"),
      artist: "cunami flo",
      image: "https://static.klix.ba/media/images/vijesti/b_240111142.jpg?v=1",
    },
    {
      time: new Date("2024-04-20T22:25:00"),
      artist: "edo maajka",
      image:
        "https://www.dnevno.hr/wp-content/uploads/2022/05/edo_maajka15-250620-e1653031078314.jpg",
    },
    {
      time: new Date("2024-04-20T22:55:00"),
      artist: "hiljson mandela",
      image:
        "https://image.dnevnik.hr/media/images/996x562/Jul2023/62586419-hiljson-mandela.jpg",
    },
    {
      time: new Date("2024-04-20T23:25:00"),
      artist: "grše",
      image: "https://glazba.hr/wp-content/uploads/2022/03/14A4240-1024x683.jpg",
    },
    {
      time: new Date("2024-04-21T00:00:00"),
      artist: "vojko v",
      image: "https://i1.sndcdn.com/artworks-000224682865-xghdr7-t500x500.jpg",
    },
    {
      time: new Date("2024-04-21T00:35:00"),
      artist: "33banda",
      image:
        "https://studentski.hr/system/pictures/images/9/original/53e2167a9493247b4c179a4800075f2e23d45714.jpg?1440586028",
    },
    {
      time: new Date("2024-04-21T01:10:00"),
      artist: "peki",
      image: "https://glazba.hr/wp-content/uploads/2023/05/014A7213.jpg",
    },
    {
      time: new Date("2024-04-21T01:30:00"),
      artist: "trepaj il' krepaj",
      image: "https://cdn.jwplayer.com/v2/media/F8sO45Sf/poster.jpg?width=720",
    },
  ];
}

function updatePerformances(performanceSchedule, timeFormat) {
  const currentTime = getCurrentTime();
  let futurePerformances = [];
  let currentPerformance = null;

  for (let i = 0; i < performanceSchedule.length; i++) {
    const { time: scheduleTime, artist, image } = performanceSchedule[i];
    const nextScheduleTime = getNextScheduleTime(i, performanceSchedule);

    if (isCurrentPerformance(currentTime, scheduleTime, nextScheduleTime)) {
      currentPerformance = createPerformance(artist, scheduleTime, image, timeFormat);
    } else if (currentTime < scheduleTime) {
      futurePerformances.push(createPerformance(artist, scheduleTime, image, timeFormat));
    }
  }

  if (currentPerformance) {
    setCurrentPerformance(currentPerformance);
  }
  setNextPerformances(futurePerformances);
}

function getNextScheduleTime(index, schedule) {
  return index < schedule.length - 1 ? schedule[index + 1].time : END_OF_SCHEDULE;
}

function isCurrentPerformance(currentTime, scheduleTime, nextScheduleTime) {
  return currentTime >= scheduleTime && currentTime < nextScheduleTime;
}

function createPerformance(artist, time, image, timeFormat) {
  return {
    artist,
    timeUntil: timeFormat === "abs" ? time : getTimeUntilNext(time),
    image,
  };
}

function getCurrentTime() {
  return new Date();
}
function getTimeUntilNext(nextPerformanceTime) {
  const currentTime = getCurrentTime();
  return Math.round((nextPerformanceTime - currentTime) / 60000);
}

function setCurrentPerformance({ artist, image }) {
  const container = document.querySelector(".current-performance-container");
  container.style.background = `linear-gradient(rgba(35, 51, 102, 0.9), rgba(35, 51, 102, 0.9)), url("${
    image || ""
  }") no-repeat center center/cover`;
  document.getElementById("currentPerformance").textContent =
    artist || "No current performance";
}

function setNextPerformances(futurePerformances) {
  const futurePerformancesElement = document.getElementById("futurePerformances");
  futurePerformancesElement.innerHTML = futurePerformances
    .map(formatPerformance)
    .join("");
}

function formatPerformance({ artist, timeUntil }) {
  return `<li>${artist} <span class="time-until">- ${
    timeUntil instanceof Date ? formatTime(timeUntil) : `${timeUntil} minutes`
  }</span></li>`;
}

function formatTime(time) {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
