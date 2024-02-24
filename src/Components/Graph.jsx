import { Line } from "react-chartjs-2"
import { useSelector } from "react-redux";

function Graph() {
    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days', // X-axis title
                    color: 'grey',
                    font: {
                        size: 10,
                        weight: 'bold',
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Commits', // Y-axis title
                    color: 'grey',
                    font: {
                        size: 10,
                        weight: 'bold',
                    },
                },
            },
        }, tooltips: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            titleFontColor: 'black',
            titleFontFamily: 'Arial',
            bodyFontColor: 'black',
            bodyFontFamily: 'Arial',
            displayColors: false,
        },
    };


    const dataOfCommits  = useSelector((store) => store.dataOfCommits);

    return (
        <Line className="line-chart" data={{

            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [
                {
                    data: dataOfCommits,
                    label: 'Commits per Day',
                    fill: false,
                    borderColor: 'grey',
                },
            ],
        }}
            options={chartOptions}

        />
    )
}

export default Graph
