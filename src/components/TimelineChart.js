import {Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'
function TimelineChart({palette, title, lst, w, h}) {
    const months = Array.from({ length: 6 }, (_, i) => ({ month: i + 1, pages: 0 }));
    const monthMap = lst.reduce((acc, item) => {
        const { month, pages } = item;
        acc[month] = (acc[month] || 0) + pages;
        return acc;
      }, {});
    
      // Step 3: Merge with months array
      const data = months.map(({ month }) => ({
        month,
        pages: monthMap[month] || 0,
      }));

    return(
        <div id="stacked-timeline-chart">
            <h3>{title}</h3>
            <BarChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="pages" fill={palette[4]} />
            </BarChart>
        </div>
    )
}
export default TimelineChart