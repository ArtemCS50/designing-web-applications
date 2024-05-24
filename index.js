const fs = require("fs");
const { Parser } = require("xml2js");

const parser = new Parser();

const date = process.argv[2];

if (!date) {
  console.log("Enter date provided");
  process.exit(1);
}

const meetings = fs.readFileSync("meetings.xml", "utf-8");

parser.parseString(meetings, (err, result) => {
  if (err) {
    console.log("Error has occured");
    process.exit(1);
  }

  const meetings = result.meetings.meeting;

  fs.writeFileSync(
    `meetings.html`,
    `<html>
  <body>
    <h1>Meetings of ${date}</h1>
    <ul>
    ${meetings
      .filter((meeting) => meeting.date[0] === date)
      .map((meeting) => {
        return `<li style="font-size: 24px">
        Meeting with ${meeting.person[0]}. Place: ${meeting.location[0]}, time: ${meeting.time[0]}.
      </li>`;
      })
      .join("\n")}
    </ul>
  </body>
</html>`
  );
});
