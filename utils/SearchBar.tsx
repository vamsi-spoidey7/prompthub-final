import { AiOutlineSearch } from "react-icons/ai";
import React, { useState, useEffect, useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

type Props = {};
const SearchBar = (props: Props) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch suggestions when component mounts
        fetchSuggestions("");
    }, []);

    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener("click", handleClickOutside);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        // Close the search bar if clicked outside of it
        if (
            searchBarRef.current &&
            event.target instanceof Node &&
            !searchBarRef.current.contains(event.target)
        ) {
            setIsExpanded(false);
        }
    };

    const fetchSuggestions = async (searchTerm: any) => {
        try {
            // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your API
            const response = await fetch(
                `/api/get-prompt-suggestions?query=${encodeURIComponent(
                    searchTerm
                )}`
            );
            const data = await response.json();
            setSuggestions(data.prompts); // Assuming the API returns an array of suggestions
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const formatResult = (item: any) => {
        return (
            <>
                <span style={{ display: "block", textAlign: "left" }}>
                    {item.name}
                </span>
            </>
        );
    };

    const styling = {
        // Customize the styles of the autocomplete component
        height: "40px",
        border: "1px solid #dfe1e5",
        borderRadius: "15px",
        backgroundColor: "white",
        boxShadow: "none",
        hoverBackgroundColor: "#f2f2f2",
        color: "#212121",
        fontSize: "18px",
        fontFamily: "Helvetica, sans-serif",
        // Additional styling can be added here
    };

    const handleOnSearch = (string: any) => {
        fetchSuggestions(string);
    };

    const handleOnSelect = (item: any) => {
        console.log("Selected:", item);
        router.push(`/prompt/${item.id}`);
    };

    const handleOnClear = () => {
        setSuggestions([]);
    };

    const toggleSearchBar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSearchBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        // <AiOutlineSearch className="text-[25px] md:mr-3 lg:mr-5 cursor-pointer" />
        <div
            ref={searchBarRef}
            className={`relative ${
                isExpanded ? "w-[300px]" : "w-[50px]"
            } text-[25px] md:mr-3 lg:mr-5 cursor-pointer`}
            onClick={toggleSearchBar}
        >
            <AiOutlineSearch className="text-[29px] absolute top-1/2 transform -translate-y-1/2 left-2 text-xl cursor-pointer" />
            {isExpanded && (
                <div onClick={handleSearchBarClick}>
                    <ReactSearchAutocomplete
                        items={suggestions}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        onClear={handleOnClear}
                        formatResult={formatResult}
                        styling={styling}
                        inputDebounce={100}
                        placeholder="Type to search"
                    />
                </div>
            )}
        </div>
    );
};
export default SearchBar;
