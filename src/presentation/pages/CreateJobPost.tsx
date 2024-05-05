import JobPostForm from "../components/JobPostForm"


function CreateJobPost() {

    
  return (
    <div className="my-16 w-full">
        <div className="flex flex-col gap-10 items-center">
            <h1 className="text-center font-semibold text-2xl">Create Job Post</h1>
            <JobPostForm formType="create"/>
        </div>
    </div>
)
}

export default CreateJobPost