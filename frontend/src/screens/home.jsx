import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft, faPrint } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import Loading from "../components/loading";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { ucFirst } from "../libs";

const Home = () => {
	const [school, setSchool] = useState("");
	const [course, setCourse] = useState("");
	const [roll, setRoll] = useState("");
	const [registration, setRegistration] = useState("");
	const [result, setResult] = useState("");
	const [searching, setSearching] = useState(false);

	const schools = [
		{
			id: 1,
			name: "School 1",
			courses: [
				{
					id: 1,
					name: "Course 1"
				},
				{
					id: 2,
					name: "Course 2"
				},
				{
					id: 3,
					name: "Course 3"
				},
				{
					id: 4,
					name: "Course 4"
				},
				{
					id: 5,
					name: "Course 5"
				}
			],
            gradeRange: {
                "A+": 80,
                "A": 70,
                "A-": 60,
                "B": 50,
                "C": 40,
                "D": 33,
                "F": 0
            },
            gradePoint: {
                "A+": 5,
                "A": 4,
                "A-": 3.5,
                "B": 3,
                "C": 2,
                "D": 1,
                "F": 0
            }
		},
		{
			id: 2,
			name: "School 2",
			courses: [
				{
					id: 1,
					name: "Course 6"
				},
				{
					id: 2,
					name: "Course 7"
				},
				{
					id: 3,
					name: "Course 8"
				},
				{
					id: 4,
					name: "Course 9"
				},
				{
					id: 5,
					name: "Course 10"
				}
			],
            gradeRange: {
                "A+": 80,
                "A": 70,
                "A-": 60,
                "B": 50,
                "C": 40,
                "D": 33,
                "F": 0
            },
            gradePoint: {
                "A+": 5,
                "A": 4,
                "A-": 3.5,
                "B": 3,
                "C": 2,
                "D": 1,
                "F": 0
            }
		},
		{
			id: 3,
			name: "School 3",
			courses: [
				{
					id: 1,
					name: "Course 11"
				},
				{
					id: 2,
					name: "Course 12"
				},
				{
					id: 3,
					name: "Course 13"
				},
				{
					id: 4,
					name: "Course 14"
				},
				{
					id: 5,
					name: "Course 15"
				}
			],
            gradeRange: {
                "A+": 80,
                "A": 70,
                "A-": 60,
                "B": 50,
                "C": 40,
                "D": 33,
                "F": 0
            },
            gradePoint: {
                "A+": 5,
                "A": 4,
                "A-": 3.5,
                "B": 3,
                "C": 2,
                "D": 1,
                "F": 0
            }
		},
		{
			id: 4,
			name: "School 4",
			courses: [
				{
					id: 1,
					name: "Course 16"
				},
				{
					id: 2,
					name: "Course 17"
				},
				{
					id: 3,
					name: "Course 18"
				},
				{
					id: 4,
					name: "Course 19"
				},
				{
					id: 5,
					name: "Course 20"
				}
			],
            gradeRange: {
                "A+": 80,
                "A": 70,
                "A-": 60,
                "B": 50,
                "C": 40,
                "D": 33,
                "F": 0
            },
            gradePoint: {
                "A+": 5,
                "A": 4,
                "A-": 3.5,
                "B": 3,
                "C": 2,
                "D": 1,
                "F": 0
            }
		},
		{
			id: 5,
			name: "School 5",
			courses: [
				{
					id: 1,
					name: "Course 21"
				},
				{
					id: 2,
					name: "Course 22"
				},
				{
					id: 3,
					name: "Course 23"
				},
				{
					id: 4,
					name: "Course 24"
				},
				{
					id: 5,
					name: "Course 25"
				}
			],
            gradeRange: {
                "A+": 80,
                "A": 70,
                "A-": 60,
                "B": 50,
                "C": 40,
                "D": 33,
                "F": 0
            },
            gradePoint: {
                "A+": 5,
                "A": 4,
                "A-": 3.5,
                "B": 3,
                "C": 2,
                "D": 1,
                "F": 0
            }
		}
	]

	const handleSchoolChange = (e) => {
		setSchool(e.target.value);
	}
	const handleCourseChange = (e) => {
		setCourse(e.target.value);
	}
	const handleRoll = (e) => {
		setRoll(e.target.value);
	}
	const handleRegistration = (e) => {
		setRegistration(e.target.value);
	}
	const handleSubmit = (e) => {
		if (searching) return;
		e.preventDefault();
		setSearching(true);
		if (!school || !course || !roll || !registration) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "All the fields are required"
			});
			setSearching(false);
			return;
		} else {
			setTimeout(() => {
				setResult({
					"status": "published",
					"roll": roll,
					"registration": registration,
					"course": schools.find(sc => sc.id == school).courses.find(cr => cr.id == course).name,
					"school": schools.find(sc => sc.id == school).name,
					"marks": {
						"english": {
							"assignment": 5,
							"midterm": 10,
							"final": 60
						},
						"bangla": {
							"assignment": 3,
							"midterm": 17,
							"final": 45
						},
						"math": {
							"assignment": 10,
							"midterm": 20,
							"final": 70
						},
						"science": {
							"assignment": 10,
							"midterm": 20,
							"final": 70
						},
						"religion": {
							"assignment": 5,
							"midterm": 11,
							"final": 51
						}
					}
				});
				setSearching(false);
			}, 2000);
		}
	}
    const contentToPrint = useRef();

	return (
		<div className="result-page">
			{
				result === "" ? (
					<form>
						<h1>Search Your Result</h1>
						<select onChange={handleSchoolChange} defaultValue={school}>
							<option value="">Select School</option>
							{schools.map((sc) => (
								<option key={sc.id} value={sc.id}>{sc.name}</option>
							))}
						</select>
						{
							school && (
								<select onChange={handleCourseChange} defaultValue={course}>
									<option value="">Select Course</option>
									{schools.find((s) => s.id == school).courses.map((cr) => (
										<option key={cr.id} value={cr.id}>{cr.name}</option>
									))}
								</select>
							)
						}
						<input type="text" placeholder="Roll Number" value={roll} onChange={handleRoll} />
						<input type="text" placeholder="Registration" value={registration} onChange={handleRegistration} />
						<button type="submit" onClick={handleSubmit}>
							{searching ? (<Loading />) :
								<>
									<span>Search</span>
									<FontAwesomeIcon icon={faSearch} />
								</>
							}
						</button>
					</form>
				) : (
					<div className="result" ref={contentToPrint}>
						<h1>Result</h1>
						<div className="result-header">
							<h2>Status: {ucFirst(result.status)}</h2>
							<h2>Roll: {result.roll}</h2>
							<h2>Registration: {result.registration}</h2>
							<h2>Course: {result.course}</h2>
							<h2>School: {result.school}</h2>
							<h2>Total: {Object.keys(result.marks).length * 100}</h2>
						</div>
						<h2>Marks</h2>
						<table>
							<thead>
								<tr>
									<th>Subject</th>
									<th>Marks</th>
									<th>Total</th>
									<th>Point</th>
									<th>Grade</th>
								</tr>
							</thead>
							<tbody>
								{
									Object.keys(result.marks).map((key) => (
										<tr key={key}>
											<td>{ucFirst(key)}</td>
											<td className="marks">{
												Object.keys(result.marks[key]).map((k) => (
													<p key={k}>{ucFirst(k)}: {result.marks[key][k]}</p>
												))
											}</td>
											<td>{
                                                Object.keys(result.marks[key]).reduce((acc, k) => acc + result.marks[key][k], 0)
                                            }</td>
											<td>
                                                {
                                                    schools.map((sc) => sc.name).includes(result.school) ? (
                                                        schools.find((sc) => sc.name === result.school).gradePoint[
                                                            Object.keys(schools.find((sc) => sc.name === result.school).gradeRange).find((key1) => {
                                                                const total = Object.keys(result.marks[key]).reduce((acc, k) => acc + result.marks[key][k], 0);
                                                                return total >= schools.find((sc) => sc.name === result.school).gradeRange[key1];
                                                            })
                                                        ]
                                                    ) : "N/A"
                                                }
                                            </td>
											<td>{
                                                schools.map((sc) => sc.name).includes(result.school) ? (
                                                    Object.keys(schools.find((sc) => sc.name === result.school).gradeRange).find((key1) => {
                                                        const total = Object.keys(result.marks[key]).reduce((acc, k) => acc + result.marks[key][k], 0);
                                                        return total >= schools.find((sc) => sc.name === result.school).gradeRange[key1];
                                                    })
                                                ) : "N/A"
                                            }</td>
										</tr>
									))
								}
                                <tr>
                                    <td colSpan="2">Total</td>
                                    <td>{
                                        Object.keys(result.marks).reduce((acc, key) => {
                                            return acc + Object.keys(result.marks[key]).reduce((acc1, k) => acc1 + result.marks[key][k], 0);
                                        }, 0)
                                    }</td>
                                    <td colSpan={2}>
                                        GPA: {
                                        schools.map((sc) => sc.name).includes(result.school) ? (
                                            (
                                                Object.keys(result.marks).reduce((acc, key) => {
                                                    const totalMarks = Object.keys(result.marks[key]).reduce((acc1, k) => acc1 + result.marks[key][k], 0);
                                                    const gradePoint = schools.find((sc) => sc.name === result.school).gradePoint[
                                                        Object.keys(schools.find((sc) => sc.name === result.school).gradeRange).find((key1) => {
                                                            return totalMarks >= schools.find((sc) => sc.name === result.school).gradeRange[key1];
                                                        })
                                                    ];
                                                    return acc + gradePoint;
                                                }, 0) / Object.keys(result.marks).length
                                            ).toFixed(2)
                                        ) : "N/A"
                                    }</td>
                                </tr>
                            </tbody>
						</table>
						<div className="result-footer">
							<button onClick={() => setResult("")}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span>Back</span>
                            </button>
                            <ReactToPrint
                                trigger={() => <button>
                                                    <span>Print</span>
                                                    <FontAwesomeIcon icon={faPrint} />
                                                </button>}
                                content={() => contentToPrint.current}
                                
                            />
                            
						</div>
					</div>
				)
			}
			
		</div>
	);
}

export default Home;