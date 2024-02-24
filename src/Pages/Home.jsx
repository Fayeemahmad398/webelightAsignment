/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SetMostStaredRepoes, clearPrevData, setLoader } from "../redux/reducers/reducerSlice";
import { useDispatch } from "react-redux";
import ListOfRepoes from "../Components/ListOfRepoes";
import { toast } from "react-toastify";
import { MenuItem, Select } from "@mui/material";

function Home() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const [selectedTime, setSelectedTime] = useState("Last one month");

    function getDateFromUserChoice() {
        let currDateInMs = new Date().getTime();

        if (selectedTime == "Last week") {
            currDateInMs = currDateInMs - 7 * 24 * 60 * 60 * 1000;
        } else if (selectedTime == "Last two weeks") {
            currDateInMs = currDateInMs - 15 * 24 * 60 * 60 * 1000;
        } else {
            currDateInMs = currDateInMs - 30 * 24 * 60 * 60 * 1000;
        }
        let pastDate = new Date(currDateInMs).toISOString().split("T")[0]
        return pastDate

    }

    function fetchMostLatestRepoes() {
        dispatch(setLoader(true))
        let getDate = getDateFromUserChoice();
        const url = `https://api.github.com/search/repositories?q=created:>${getDate}&
        sort=stars&order=desc&page=${page}&per_page=100`;

        fetch(url).then((res) => {
            return res.json().then((d) => {
                let newItems = d.items;
                dispatch(setLoader(false));
                dispatch(SetMostStaredRepoes(newItems));

            })
        }).catch((error) => {
            setLoader(false);
            toast.error(`Error is : ${error.message}`);
        })
    }

    useEffect(() => {
        fetchMostLatestRepoes();

        window.addEventListener("scroll", HandleInfiniteScroll);
        return () => window.removeEventListener("scroll", HandleInfiniteScroll);
    }, [page, selectedTime]);


    function HandleInfiniteScroll() {
        if (window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.scrollHeight) {
            setPage((prev) => prev + 1);
        }
    }

    function handleTimeUserChoice(e) {
        dispatch(clearPrevData());
        setSelectedTime(e.target.value);
    }

    return (
        <div className="home">
            <div className="most-starred-repo-box">
                <div className="heading-dark">
                    Most starred Repos
                </div>
                <Select
                    onChange={handleTimeUserChoice}
                    value={selectedTime}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    className="all-selects"
                    autoFocus={false}
                >
                    <MenuItem value="Last one month">Last one month</MenuItem>
                    <MenuItem value="Last week">Last week</MenuItem>
                    <MenuItem value="Last two weeks">Last two weeks</MenuItem>

                </Select>

            </div>
            <ListOfRepoes />
        </div>
    )
}

export default Home
