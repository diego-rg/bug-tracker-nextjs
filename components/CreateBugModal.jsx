import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function CreateBugModal({
    session,
    term,
    formData,
    params,
    setToggleModalCreateBug,
    setBugs
}) {

    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState("");

    // -------------------------
    // ML STATE
    // -------------------------

    const [name, setName] = useState("");
    const [checking, setChecking] = useState(false);
    const [result, setResult] = useState(null);

    const isGood = result?.valid;

    const fetchBugs = async () => {
        const response = await fetch(
            `/api/users/${session?.user.id}/projects/${params.projectId}/bugs/search?q=${term}&status=${formData.status}&priority=${formData.priority}&severity=${formData.severity}`
        );
        const data = await response.json();
        setBugs(data);
    };

    // -------------------------
    // VERIFY NAME (ML CALL)
    // -------------------------

    const verifyName = async () => {
        if (!name.trim()) return;

        setChecking(true);

        try {
            const res = await fetch("/api/check_title", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: name,
                }),
            });

            const data = await res.json();

            setResult(data);

        } catch (err) {
            console.error(err);

            setResult({
                valid: false,
                score: 0,
                quality: "error",
            });

        } finally {
            setChecking(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setInfo("");

        try {
            const formData = new FormData(e.currentTarget);

            const response = await fetch(
                `/api/users/${session?.user.id}/projects/${params.projectId}/bugs`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setInfo(data.message);
                return;
            }

            setInfo(data.message);

            if (session?.user.id) fetchBugs();

            await new Promise((resolve) => setTimeout(resolve, 1000));

            setToggleModalCreateBug((prev) => !prev);

            setInfo("");

        } catch (error) {
            console.log(error);
            setInfo("Unnexpected error. Try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal_container">
            <div className="modal_content">

                <div className="modal_header">
                    <h3 className="modal_title">Fill the bug data</h3>

                    <button
                        onClick={() => setToggleModalCreateBug((prev) => !prev)}
                        type="button"
                        className="btn_menu"
                    >
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">

                    {/* ---------------- NAME ---------------- */}

                    <div className="pb-4">
                        <label htmlFor="name" className="form_label">
                            Name:
                        </label>

                        <input
                            className="form_input"
                            type="text"
                            placeholder="Name of the bug"
                            name="name"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* VERIFY BUTTON + RESULT */}

                        <div className="flex items-center gap-3 mt-2">

                            <button
                                type="button"
                                onClick={verifyName}
                                disabled={checking}
                                className="btn_primary"
                            >
                                {checking ? "Checking..." : "Verify name"}
                            </button>

                            {result && (
                                <span
                                    className={`font-medium ${
                                        isGood ? "text-green-500" : "text-red-500"
                                    }`}
                                >
                                    Score: {result.score} - {result.quality}
                                </span>
                            )}

                        </div>
                    </div>

                    {/* ---------------- DESCRIPTION ---------------- */}

                    <div className="pb-4">
                        <label htmlFor="description" className="form_label">
                            Description:
                        </label>

                        <textarea
                            rows="5"
                            name="description"
                            id="description"
                            className="form_input"
                        />
                    </div>

                    {/* ---------------- PRIORITY ---------------- */}

                    <div className="pb-4">
                        <label htmlFor="priority" className="form_label">
                            Priority:
                        </label>

                        <select
                            id="priority"
                            name="priority"
                            className="form_input"
                        >
                            <option value="" disabled hidden>
                                Select...
                            </option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* ---------------- SEVERITY ---------------- */}

                    <div className="pb-4">
                        <label htmlFor="severity" className="form_label">
                            Severity:
                        </label>

                        <select
                            id="severity"
                            name="severity"
                            className="form_input"
                        >
                            <option value="" disabled hidden>
                                Select...
                            </option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* ---------------- INFO ---------------- */}

                    <div className="dark:text-white">{info}</div>

                    {/* ---------------- ACTIONS ---------------- */}

                    <div className="flex gap-2">

                        <button
                            className="btn_success"
                            type="submit"
                            disabled={submitting}
                        >
                            Save bug
                        </button>

                        <button
                            className="btn_primary"
                            onClick={() =>
                                setToggleModalCreateBug((prev) => !prev)
                            }
                            type="button"
                            disabled={submitting}
                        >
                            Close
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}