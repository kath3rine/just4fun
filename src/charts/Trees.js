import { Treemap, Tooltip, ResponsiveContainer} from  'recharts'

export function Themes({dataIn}) {
    const themeCounts = {};
    dataIn.forEach(({ theme }) => {
        const themes = Array.isArray(theme) ? theme : [];
        themes.forEach(t => {
            if (!themeCounts[t]) {
                themeCounts[t] = 0;
            }
            themeCounts[t] += 1;
        });
    });

    const data = Object.entries(themeCounts).map(([theme, count]) => ({
        name: theme,
        size: count
      }));
      
    return(
        <div style={{width: "100%"}}>
            <h3>themes</h3>
            <ResponsiveContainer width="100%" height={200}>
            <Treemap
            data={data}
            dataKey="size"
            nameKey="name"
            fontSize={8}
            >
                <Tooltip />
            </Treemap>
            </ResponsiveContainer>
        </div>
    )
}
