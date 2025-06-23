import {Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'
function TimelineChart({title, lst, w, h, field}) {
    const months = Array.from({ length: 6 }, (_, i) => ({ month: i + 1, pages: 0 }));
    const pagesMap = lst.reduce((acc, item) => {
        const { month, pages } = item;
        acc[month] = (acc[month] || 0) + pages;
        return acc;
      }, {});
    
      var data = [{month: 1, pages: 0}]
      if (field == "pages") {
        data = months.map(({ month }) => ({
            month,
            value: pagesMap[month] || 0,
          }));
      } else if (field == "meetingMonth") {
        data = months.map(({ month }) => ({
            month,
            value: lst.filter(x => x.month == month).length,
          }));
      } else if (field == "age") {
        for (let i = 18; i < 25; i++) {
            data[i - 18] = {
                month: i,
                value: lst.filter(x => x.age == i).length
            }
        }
      }
      
    return(
        <div id="stacked-timeline-chart">
            <h3>{title}</h3>
            <BarChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="value" fill="#bce" />
            </BarChart>
        </div>
    )
}
export default TimelineChart