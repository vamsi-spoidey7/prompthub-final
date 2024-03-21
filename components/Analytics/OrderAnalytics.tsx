"use client";
import { generateLast30DaysOrderData } from "@/actions/analytics/getOrdersAnalytics";
import { styles } from "@/utils/styles";
import { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type Props = {
    isDashboard?: boolean;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const formattedDate = new Date(label).toLocaleDateString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        return (
            <div className="custom-tooltip backdrop-brightness-0 p-2">
                <p className="label">{`Date: ${formattedDate}`}</p>
                <p className="label">{`Count: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
    const [data, setData] = useState<any>();

    useEffect(() => {
        generateLast30DaysOrderData(new Date())
            .then((res) => {
                const formattedData = res.last30Days.map((item: any) => ({
                    day: new Date(item.day), // Convert date string to Date object
                    count: item.count,
                }));
                // Sort the data by date
                formattedData.sort((a, b) => a.day.getTime() - b.day.getTime());
                setData(formattedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    data?.last30Days?.forEach((item: any) => {
        data?.last30Days?.push({ day: item.day, count: item.count });
    });

    return (
        <>
            <div
                className={`${
                    !isDashboard
                        ? "mt-[50px]"
                        : "mt-[50px] bg-[#111C43] shadow-sm pb-5 rounded-sm"
                }`}
            >
                <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
                    <h1
                        className={`${styles.title} ${
                            isDashboard && "!text-[20px]"
                        } px-5 !text-start`}
                    >
                        <span className="font-bold">Orders Analytics</span>{" "}
                        <span className="text-[14px]">this month</span>
                    </h1>
                    {!isDashboard && (
                        <p className={`${styles.label} px-5`}>
                            Last 12 months analytics data{" "}
                        </p>
                    )}
                </div>

                <div
                    className={`w-full ${
                        isDashboard ? "h-[30vh]" : "h-screen"
                    } flex items-center justify-center`}
                >
                    {data ? (
                        <>
                            <ResponsiveContainer
                                width={isDashboard ? "100%" : "90%"}
                                height={!isDashboard ? "50%" : "100%"}
                            >
                                <AreaChart
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <XAxis
                                        dataKey="day"
                                        tickFormatter={(tick) =>
                                            new Date(tick).toLocaleDateString(
                                                "default",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                }
                                            )
                                        }
                                    />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#4d62d9"
                                        fill="#4d62d9"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </>
                    ) : (
                        <div>Loading....</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderAnalytics;
