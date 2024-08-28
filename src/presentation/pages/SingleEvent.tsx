import { NavLink, useParams } from 'react-router-dom';
import SingleEventImg from '../../assets/Images/SingleEventImg.png';
import { Icon, IconProps } from '@iconify/react';
import useEvent from '../../application/hooks/useEvent.ts';
import { useContext, useEffect, useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator.tsx';
import { challengesTopics, styles } from '../../application/consts.ts';
import EventChallengeCard from '../components/EventChallengeCard.tsx';
import moment from 'moment';
import CountDown from '../components/CountDown.tsx';
import useTeam from '../../application/hooks/useTeam.ts';
import UserSessionContext from '../../application/contexts/UserSessionContext.ts';
import ToastContext from '../../application/contexts/ToastContext.ts';

type TopicsIconsMap = {
  [key in ChallengeTopic]: React.ReactElement<IconProps, string | React.JSXElementConstructor<any>>;
};

const topics: TopicsIconsMap = {
  "all topics": <Icon icon="ph:code" width="18" height="18" />,
  "data structures": <Icon icon="carbon:data-structured" width="18" height="18" />,
  "problem solving": <Icon icon="carbon:data-structured" width="18" height="18" />,
  "algorithms": <Icon icon="mdi:flowchart" width="18" height="18" />,
  "databases": <Icon icon="material-symbols-light:database" width="18" height="18" />
};

const isActiveBackground = `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`;

function SingleEvent() {
  const { isValidSession, userSession } = useContext(UserSessionContext);
  const { alertError } = useContext(ToastContext);
  const { id } = useParams()
  const {
    event, getEventById,
    teams, setTeams, getTeams, joinEvent, leaveEvent,
    isChallengesLoading, eventChallenges, getEventChallenges, getEventChallengesByTopic
  } = useEvent();

  const [selectedTopic, setSelectedTopic] = useState<ChallengeTopic>('all topics');
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(-1);
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  const [teamPassowrd, setTeamPassword] = useState('');
  const {
    editTeam, setEditTeam,
    createTeam, updateTeam,
    leaveTeam, deleteTeam,
    joinTeam, userTeam, setUserTeam,
    getUserTeam
  } = useTeam();

  useEffect(() => {
    if (id) {
      getEventById(parseInt(id));
      getEventChallenges(parseInt(id));
      getTeams(parseInt(id));
      getUserTeam(parseInt(id));
    }
  }, []);

  useEffect(() => {
    if (id) {
      if (selectedTopic == 'all topics') {
        getEventChallenges(parseInt(id));
      } else {
        getEventChallengesByTopic(parseInt(id), selectedTopic);
      }
    }
  }, [selectedTopic]);

  const isComming = (): boolean => {
    const startDate = new Date(event.start_at);
    const currentDate = new Date();

    return currentDate < startDate;
  }

  const formTriggerHandler = () => {
    if (userTeam && isTeamAdmin()) {
      setEditTeam(userTeam);
    }
    setIsTeamFormOpen(true);
  }

  const isTeamAdmin = (): boolean => {
    return isValidSession && userTeam?.leader?.id == userSession.user?.id
  }

  const updateTeamHandler = async () => {
    const updateTeamResult = await updateTeam(event.id as number);
    if (updateTeamResult) {
      setIsTeamFormOpen(false);
    }
  }

  const deleteTeamHandler = async () => {
    const deleteTeamResult = await deleteTeam(event.id as number);
    if (deleteTeamResult) {
      setSelectedTeamIndex(-1);
      setTeams(state => state.filter(t => t.id != userTeam?.id));
      setUserTeam(null);
    }
  }

  const createTeamHandler = async () => {
    const createTeamResult = await createTeam(event.id as number);
    if (createTeamResult) {
      setUserTeam(createTeamResult);
      setTeams(state => [...state, createTeamResult]);
      setIsTeamFormOpen(false);
    }
  }

  const joinEventHandler = () => {
    if (!isValidSession) {
      alertError("Oops! It looks like you're not logged in. Please log in or create an account to join the event and unlock all features.");
      return;
    }

    joinEvent(event.id as number);
  }

  return (
    <div className="w-full flex flex-col items-center mt-12">
      {event && (
        <div className='w-full flex flex-col md:flex-row gap-4 md:gap-0'>
          <div className="md:w-1/2 w-full md:pr-8 order-2 md:order-1">
            <div className="text-gray-50 text-2xl font-semibold py-4">{event.title}</div>
            <div className='text-gray-300 text-sm'>{event.description}</div>
            <div className='mt-8 py-1 flex items-center gap-2'>
              <Icon className='opacity-60' icon="icons8:organization" width="18" height="18" />
              <div className='opacity-60 mr-2'>Organization:</div>
              <NavLink to={`/organization/${event.organization?.id}`}>{event.organization?.name}</NavLink>
            </div>
            <div className='py-1 flex items-center gap-2'>
              <Icon className='opacity-60' icon="icon-park-solid:stopwatch-start" width="18" height="18" />
              <div className='opacity-60 mr-2'>Start at:</div>
              <div>{moment(event.start_at).format("dddd, DD MMMM yyyy HH:mm")}</div>
            </div>
            <div className='py-1 flex items-center gap-2'>
              <Icon className='opacity-60' icon="mdi:clock-end" width="18" height="18" />
              <div className='opacity-60 mr-2'>End at:</div>
              <div>{moment(event.end_at).format("dddd, DD MMMM yyyy HH:mm")}</div>
            </div>
            {
              !!event.is_team_based && (
                <div className='py-1 flex items-center gap-2'>
                  <div className='flex items-center gap-2'>
                    <Icon className='opacity-60' icon="fluent:people-team-16-filled" width="18" height="18" />
                    <div className=' mr-2 opacity-60'>Max Team Members:</div>
                    <div>{event.max_team_members}</div>
                  </div>
                </div>
              )
            }
            {
              event.didJoin ? (
                <div onClick={() => leaveEvent(event.id as number)} className='mt-8 px-16 py-1 flex items-center rounded-xl bg-yellow-600 text-gray-50 font-medium w-fit cursor-pointer hover:bg-yellow-700 duration-300 active:scale-110 select-none'>
                  <Icon icon="pepicons-pop:leave" />
                  <div className='ml-2'>Leave</div>
                </div>
              ) : (
                <div onClick={joinEventHandler} className='mt-8 md:w-fit px-16 py-1 flex justify-center items-center rounded-xl bg-yellow-600 text-gray-50 font-medium w-full cursor-pointer hover:bg-yellow-700 duration-300 active:scale-110 select-none'>
                  <Icon icon="clarity:event-solid" />
                  <div className='ml-2'>Join</div>
                </div>
              )
            }
          </div>
          <div className='md:w-1/2 w-full flex flex-col items-center md:items-end order-1 md:order-2'>
            <div className='md:w-3/4 w-full rounded-xl relative'>
              {
                isComming() && (
                  <div className='absolute w-full h-full bg-black/40'>
                    <CountDown date={event.start_at} />
                  </div>
                )
              }
              <img src={event.logo_url || SingleEventImg} alt="" className='rounded-xl w-full' />

            </div>
          </div>
        </div>
      )}

      {
        (!!event.is_team_based) && (!!event.didJoin) && (
          <div className='py-10 w-full flex flex-col'>
            <div className='text-lg text-gray-50 font-semibold mb-6'>Teams:</div>
            <div className='w-full flex'>
              <div className='w-2/3 flex flex-col h-fit max-h-96 overflow-auto border-4 border-gray-800 rounded-xl duration-300'>
                <div className='w-full flex items-center px-8 bg-gray-800 py-1'>
                  <div className='flex-1 text-gray-50 font-medium'>Name</div>
                  <div className='flex-1 text-gray-50 font-medium'>Leader</div>
                  <div className='flex-1 text-gray-50 font-medium'>Privacy</div>
                  <div className='flex-1 text-gray-50 font-medium'>Members</div>
                  <div className='flex-1 text-gray-50 font-medium'>Score</div>
                </div>

                <div className='flex-grow overflow-auto'>
                  {
                    teams.map((team, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedTeamIndex(index)}
                          className={`w-full flex items-center px-8 py-2 hover:bg-gray-800/50 cursor-pointer ${selectedTeamIndex == index ? 'bg-gray-800/60' : ''}`}
                        >
                          <div className='flex-1 text-gray-50 overflow-hidden text-ellipsis' title={team.name}>{team.name}</div>
                          <div className='flex-1 text-gray-50'>{team.leader?.username}</div>
                          <div className='flex-1 text-gray-50'>{team.is_private ? 'Private' : 'Public'}</div>
                          <div className='flex-1 text-gray-50'>{`${team.members}/${event.max_team_members}`}</div>
                          <div className='flex-1 text-gray-50'>{team.score}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              {
                isComming() && (
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className={`w-11/12 flex flex-col overflow-auto duration-300 ${isTeamFormOpen ? 'max-h-full opacity-1' : 'max-h-0 opacity-0'}`}>
                      <div className='w-full flex items-center justify-between'>
                        <div className='mb-2 text-lg py-2 text-gray-50 font-semibold'>Create Team</div>
                        <div onClick={() => { setIsTeamFormOpen(false); }} className='bg-yellow-600 h-6 w-6 rounded-full flex items-center justify-center cursor-pointer duration-300 hover:bg-yellow-900'>
                          <Icon icon="material-symbols:close" />
                        </div>
                      </div>

                      <input onChange={(ev) => setEditTeam(state => ({ ...state, name: ev.target.value }))} value={editTeam.name} placeholder='Name' type='text' className='mb-2 rounded-lg bg-gray-900 text-sm px-4 py-2 text-gray-50 outline-none focus:bg-gray-800' />
                      <textarea onChange={(ev) => setEditTeam(state => ({ ...state, description: ev.target.value }))} value={editTeam.description} placeholder='Description' className='mb-2 rounded-lg bg-gray-900 text-sm px-4 py-2 text-gray-50 outline-none focus:bg-gray-800' />
                      <select onChange={(ev) => setEditTeam(state => ({ ...state, is_private: ev.target.value == 'private' }))} value={editTeam.is_private ? "private" : "public"} className='mb-2 rounded-lg bg-gray-900 text-sm px-4 py-2 text-gray-50 outline-none focus:bg-gray-800'>
                        <option value={"public"}>Public</option>
                        <option value={"private"}>Private</option>
                      </select>

                      {
                        editTeam.is_private == true && (
                          <input onChange={(ev) => setEditTeam(state => ({ ...state, password: ev.target.value }))} value={editTeam.password} placeholder='Password' type='password' className='mb-2 rounded-lg bg-gray-900 text-sm px-4 py-2 text-gray-50 outline-none focus:bg-gray-800' />
                        )
                      }
                      {
                        isTeamAdmin() && (
                          <div
                            onClick={updateTeamHandler}
                            className='mt-4 flex items-center justify-center px-16 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 duration-300 font-semibold uppercase text-sm cursor-pointer active:scale-105 select-none'
                          >
                            <Icon icon="ep:edit" />
                            <div className='ml-2 text-sm'>Update</div>
                          </div>
                        )
                      }
                      {
                        !userTeam && (
                          <div onClick={createTeamHandler} className='mt-4 flex items-center justify-center px-16 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 duration-300 font-semibold uppercase text-sm cursor-pointer active:scale-105 select-none'>
                            <Icon icon="fluent:people-team-add-20-filled" />
                            <div className='ml-2 text-sm'>Create</div>
                          </div>
                        )
                      }
                    </div>
                    {
                      !isTeamFormOpen && (
                        <div className='w-11/12 flex items-center'>
                          {
                            isTeamAdmin() && (
                              <div onClick={formTriggerHandler} className='flex-1 flex items-center justify-center py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 duration-300 font-semibold cursor-pointer active:scale-105 select-none'>
                                <Icon icon="ep:edit" />
                                <div className='ml-2 text-sm'>Update My Team</div>
                              </div>
                            )
                          }
                          {
                            !userTeam && (
                              <div onClick={formTriggerHandler} className='flex-1 flex items-center justify-center py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 duration-300 font-semibold cursor-pointer active:scale-105 select-none'>
                                <Icon icon="fluent:people-team-add-20-filled" />
                                <div className='ml-2 text-sm'>Create New Team</div>
                              </div>
                            )
                          }
                          {
                            (userTeam && isValidSession && userTeam.leader?.id != userSession.user?.id) && (
                              <div onClick={() => { leaveTeam(event.id as number) }} className='flex-1 ml-2 w-fit flex items-center justify-center py-2 text-gray-50 font-semibold rounded-xl bg-yellow-600 hover:bg-yellow-700 cursor-pointer duration-300 active:scale-105 select-none'>
                                <Icon icon="pepicons-pop:leave" />
                                <div className='ml-2 text-sm'>Leave My Team</div>
                              </div>
                            )
                          }
                          {
                            isTeamAdmin() && (
                              <div onClick={deleteTeamHandler} className='flex-1 ml-2 flex items-center justify-center py-2 rounded-xl bg-red-600 hover:bg-red-700 duration-300 font-semibold cursor-pointer active:scale-105 select-none'>
                                <Icon icon="material-symbols:delete" />
                                <div className='ml-2 text-sm'>Delete My Team</div>
                              </div>
                            )
                          }
                        </div>
                      )
                    }
                    {
                      (selectedTeamIndex >= 0) && (
                        <div className='w-11/12 flex flex-col mt-4'>
                          <div className='text-lg text-gray-50 font-medium'>{teams[selectedTeamIndex].name}</div>
                          <div className='text-sm text-gray-300 mt-2'>{teams[selectedTeamIndex].description}</div>
                          <div className='flex items-center text-gray-300 py-2'>
                            {!teams[selectedTeamIndex].is_private ? (<Icon icon="material-symbols:public" />) : ""}
                            {teams[selectedTeamIndex].is_private ? (<Icon icon="material-symbols:lock" />) : ""}
                            <div className='ml-1 text-sm font-semibold'>{!teams[selectedTeamIndex].is_private ? "Public" : "Private"}</div>
                          </div>
                          <div className='text-sm text-gray-300'>Created By <b>{teams[selectedTeamIndex].leader?.username}</b></div>

                          {
                            !userTeam && ((teams[selectedTeamIndex].is_private) ? (
                              <input onChange={(ev) => { setTeamPassword(ev.target.value); }} value={teamPassowrd} placeholder='Password' className='w-full rounded-xl px-4 py-1 bg-gray-900 mt-4 text-gray-50 outline-none focus:bg-gray-800 duration-300' />
                            ) : "")
                          }

                          {
                            userTeam && ((userTeam.id == teams[selectedTeamIndex].id) ? (
                              <div className='w-full flex flex-col'>
                                <div className='py-1 mt-4 text-gray-50 font-medium'>You are already in this team</div>

                              </div>
                            ) : (
                              <div>
                                <div className='py-1 mt-4 text-gray-50 font-medium'>You need to leave your team first.</div>
                              </div>
                            ))
                          }
                          {
                            !userTeam && (
                              <div onClick={() => { joinTeam(event.id as number, { team_id: teams[selectedTeamIndex].id as number, password: teamPassowrd }) }} className='w-fit px-8 py-1 text-gray-50 font-semibold hover:text-gray-800 rounded-xl mt-4 bg-gray-700 hover:bg-gray-300 cursor-pointer duration-300 active:scale-105 select-none'>Join</div>
                            )
                          }

                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
        )
      }

      {
        (!!event.didJoin) && (!isComming()) && (
          <div className="w-full mt-10">
            <div className="scroll-container w-full scrollbar-none ">
              <div className="flex py-2 gap-2 relative  items-center flex-wrap">
                {
                  challengesTopics.map((topic, index) => {
                    const selectTopic = () => {
                      setSelectedTopic(topic);
                    }

                    return (
                      <div key={index} onClick={selectTopic} className={`cursor-pointer hover:opacity-75 transition-opacity duration-300 flex items-center px-4 py-1 rounded-lg ${topic == selectedTopic ? isActiveBackground : 'border-1.5'}`}>
                        {topics[topic]}
                        <span className="ml-2 whitespace-nowrap capitalize">{topic}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="text-sm">
              <div>
                <div className="w-full flex items-center py-2">
                  <div className='flex-1 font-semibold'>Status</div>
                  <div className='flex-1 font-semibold'>Title</div>
                  <div className='flex-1 font-semibold'>Difficulty</div>
                  <div className='flex-1 font-semibold'>Score</div>
                </div>
                <div className='w-4/5 h-px bg-gray-400'></div>
                {
                  (!isChallengesLoading && eventChallenges.length == 0) && (
                    <div className="w-full text-center py-2 font-medium text-gray-500">No Challenges yet</div>
                  )
                }
                {
                  isChallengesLoading && (
                    <div className="w-full flex flex-col items-center py-4">
                      <LoadingIndicator />
                    </div>
                  )
                }
                {
                  eventChallenges.map((challenge, index) => {
                    return (
                      <div key={index}>
                        <EventChallengeCard challenge={challenge} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        )
      }

    </div >
  )
}

export default SingleEvent