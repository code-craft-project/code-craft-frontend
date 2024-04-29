import JobPostForm from "../components/JobPostForm"


function UpdateJobPost() {

    return (
        <div className="my-16 ">
            <div className="flex flex-col gap-10 items-center">
                <h1 className="text-center font-semibold text-2xl">Update Job Post</h1>
                <JobPostForm formType="update" />
            </div>
        </div>
    )
}

export default UpdateJobPost