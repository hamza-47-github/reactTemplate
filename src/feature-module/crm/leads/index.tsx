import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateLeads from './createleads'
import AddFile from './addfile'
import ContentAccount from './createcontent'
import SuccessMail from './sucessmail'
import Access from './access'
import AddContent from './addcontent'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import Select from 'react-select'
import { all_routes } from '../../router/all_routes'
import CollapseHeader from '../../../core/common/collapse-header'
const route = all_routes;
const LeadsDetails = () => {
 
    const [addcomment,setAddComment]=useState(false)
    const togglecomment=()=>{
        setAddComment(prevState => !prevState);
    }
    const sortbydata = [
        { value: 'Sort By Date', label: 'Sort By Date' },
        { value: 'Ascending', label: 'Ascending' },
        { value: 'Descending', label: 'Descending' }
    ];
    return (
        <>
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col-sm-4">
                      <h4 className="page-title">Leads Overview </h4>
                    </div>
                    <div className="col-sm-8 text-sm-end">
                      <div className="head-icons">
                        <CollapseHeader />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {/* Leads User */}
                <div className="contact-head">
                  <div className="row align-items-center">
                    <div className="col-sm-6">
                      <ul className="contact-breadcrumb">
                        <li>
                          <Link to={route.leads}>
                            <i className="ti ti-arrow-narrow-left" />
                            Leads
                          </Link>
                        </li>
                        <li>Tremblay and Rath</li>
                      </ul>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <div className="contact-pagination">
                        <p>1 of 40</p>
                        <ul>
                          <li>
                            <Link to="/leads-details">
                              <i className="ti ti-chevron-left" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/leads-details">
                              <i className="ti ti-chevron-right" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-wrap">
                  <div className="contact-profile">
                    <div className="avatar company-avatar">
                      <span className="text-icon">HT</span>
                    </div>
                    <div className="name-user">
                      <h5>
                        Tremblay and Rath{" "}
                        <span className="star-icon">
                          <i className="fa-solid fa-star" />
                        </span>
                      </h5>
                      <p className="mb-1">
                        <i className="ti ti-building" /> SilverHawk
                      </p>
                      <p className="mb-0">
                        <i className="ti ti-map-pin-pin" /> 22, Ave Street, Newyork,
                        USA
                      </p>
                    </div>
                  </div>
                  <div className="contacts-action">
                    <span className="badge badge-light">
                      <i className="ti ti-lock" />
                      Private
                    </span>
                    <div className="dropdown action-drops">
                      <Link
                        to="#"
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="bg-success">
                          Closed
                          <i className="ti ti-chevron-down ms-2" />
                        </span>
                      </Link>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="#">
                          <span>Closed</span>
                        </Link>
                        <Link className="dropdown-item" to="#">
                          <span>Opened</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Leads User */}
              </div>
              {/* Leads Sidebar */}
              <div className="col-xl-3">
                <div className="contact-sidebar">
                  <h6>Lead Information</h6>
                  <ul className="other-info">
                    <li>
                      <span className="other-title">Date Created</span>
                      <span>10 Jan 2024, 10:00 am</span>
                    </li>
                    <li>
                      <span className="other-title">Value</span>
                      <span>$25,11,145</span>
                    </li>
                    <li>
                      <span className="other-title">Due Date</span>
                      <span>20 Jan 2024, 10:00 am</span>
                    </li>
                    <li>
                      <span className="other-title">Follow Up</span>
                      <span>20 Jan 2024</span>
                    </li>
                    <li>
                      <span className="other-title">Source</span>
                      <span>Google</span>
                    </li>
                  </ul>
                  <h6>Owner</h6>
                  <ul className="deals-info">
                    <li>
                      <span>
                        <ImageWithBasePath src="assets/img/profiles/avatar-21.jpg" alt="Image" />
                      </span>
                      <div>
                        <p>Vaughan</p>
                      </div>
                    </li>
                  </ul>
                  <h6>Tags</h6>
                  <ul className="tag-info">
                    <li>
                      <Link
                        to="#"
                        className="badge badge-tag badge-success-light"
                      >
                        Collab
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="badge badge-tag badge-warning-light"
                      >
                        Rated
                      </Link>
                    </li>
                  </ul>
                  <h6>Projects</h6>
                  <ul className="projects-info">
                    <li>
                      <Link to="#" className="badge badge-light">
                        Devops Design
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="badge badge-light">
                        Margrate Design
                      </Link>
                    </li>
                  </ul>
                  <h6>Priority</h6>
                  <ul className="priority-info">
                    <li>
                      <div className="dropdown">
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span>
                            <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                            High
                          </span>
                          <i className="ti ti-chevron-down me-1" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link className="dropdown-item" to="#">
                            <span>
                              <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                              High
                            </span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <span>
                              <i className="ti ti-square-rounded-filled me-1 text-success circle" />
                              Low
                            </span>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="con-sidebar-title">
                    <h6>Contacts</h6>
                    <Link
                      to="#"
                      className="com-add"
                      data-bs-toggle="modal"
                      data-bs-target="#add_contact"
                    >
                      <i className="ti ti-circle-plus me-1" />
                      Add New
                    </Link>
                  </div>
                  <ul className="deals-info">
                    <li>
                      <span>
                        <ImageWithBasePath src="assets/img/profiles/avatar-01.jpg" alt="Image" />
                      </span>
                      <div>
                        <p>Jessica</p>
                      </div>
                    </li>
                  </ul>
                  <ul className="other-info">
                    <li>
                      <span className="other-title">Last Modified</span>
                      <span>10 Jan 2024, 10:00 am</span>
                    </li>
                    <li>
                      <span className="other-title">Modified By</span>
                      <span>
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-19.jpg"
                          className="avatar-xs"
                          alt="img"
                        />{" "}
                        Darlee Robertson
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Leads Sidebar */}
              {/* Leads Details */}
              <div className="col-xl-9">
                <div className="contact-tab-wrap">
                  <h4>Lead Pipeline Status</h4>
                  <div className="pipeline-list">
                    <ul>
                      <li>
                        <Link to="#" className="bg-pending">
                          Not Contacted
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="bg-info">
                          Contacted
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="bg-success">
                          Closed
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="bg-danger">
                          Lost
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <ul className="contact-nav nav">
                    <li>
                      <Link
                        to="#"
                        data-bs-toggle="tab"
                        data-bs-target="#activities"
                        className="active"
                      >
                        <i className="ti ti-alarm-minus" />
                        Activities
                      </Link>
                    </li>
                    <li>
                      <Link to="#" data-bs-toggle="tab" data-bs-target="#notes">
                        <i className="ti ti-notes" />
                        Notes
                      </Link>
                    </li>
                    <li>
                      <Link to="#" data-bs-toggle="tab" data-bs-target="#calls">
                        <i className="ti ti-phone" />
                        Calls
                      </Link>
                    </li>
                    <li>
                      <Link to="#" data-bs-toggle="tab" data-bs-target="#files">
                        <i className="ti ti-file" />
                        Files
                      </Link>
                    </li>
                    <li>
                      <Link to="#" data-bs-toggle="tab" data-bs-target="#email">
                        <i className="ti ti-mail-check" />
                        Email
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Tab Content */}
                <div className="contact-tab-view">
                  <div className="tab-content pt-0">
                    {/* Activities */}
                    <div className="tab-pane active show" id="activities">
                      <div className="view-header">
                        <h4>Activities</h4>
                        <ul>
                          <li>
                            <div className="form-sort">
                              <i className="ti ti-sort-ascending-2" />
                              <Select
                                className='select-details'
                                options={sortbydata}
                                placeholder="Sort By Date"
                            />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="contact-activity">
                        <div className="badge-day">
                          <i className="ti ti-calendar-check" />
                          29 Aug 2023
                        </div>
                        <ul>
                          <li className="activity-wrap">
                            <span className="activity-icon bg-pending">
                              <i className="ti ti-mail-code" />
                            </span>
                            <div className="activity-info">
                              <h6>You sent 1 Message to the contact.</h6>
                              <p>10:25 pm</p>
                            </div>
                          </li>
                          <li className="activity-wrap">
                            <span className="activity-icon bg-secondary-success">
                              <i className="ti ti-phone" />
                            </span>
                            <div className="activity-info">
                              <h6>
                                Denwar responded to your appointment schedule question
                                by call at 09:30pm.
                              </h6>
                              <p>09:25 pm</p>
                            </div>
                          </li>
                          <li className="activity-wrap">
                            <span className="activity-icon bg-orange">
                              <i className="ti ti-notes" />
                            </span>
                            <div className="activity-info">
                              <h6>Notes added by Antony</h6>
                              <p>
                                Please accept my apologies for the inconvenience
                                caused. It would be much appreciated if it's possible
                                to reschedule to 6:00 PM, or any other day that week.
                              </p>
                              <p>10.00 pm</p>
                            </div>
                          </li>
                        </ul>
                        <div className="badge-day">
                          <i className="ti ti-calendar-check" />
                          28 Feb 2024
                        </div>
                        <ul>
                          <li className="activity-wrap">
                            <span className="activity-icon bg-info">
                              <i className="ti ti-user-pin" />
                            </span>
                            <div className="activity-info">
                              <h6>
                                Meeting With{" "}
                                <span className="avatar-xs">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-19.jpg"
                                    alt="img"
                                  />
                                </span>{" "}
                                Abraham
                              </h6>
                              <p>Schedueled on 05:00 pm</p>
                            </div>
                          </li>
                          <li className="activity-wrap">
                            <span className="activity-icon bg-secondary-success">
                              <i className="ti ti-phone" />
                            </span>
                            <div className="activity-info">
                              <h6>
                                Drain responded to your appointment schedule question.
                              </h6>
                              <p>09:25 pm</p>
                            </div>
                          </li>
                        </ul>
                        <div className="badge-day">
                          <i className="ti ti-calendar-check" />
                          Upcoming Activity
                        </div>
                        <ul>
                          <li className="activity-wrap">
                            <span className="activity-icon bg-info">
                              <i className="ti ti-user-pin" />
                            </span>
                            <div className="activity-info">
                              <h6>Product Meeting</h6>
                              <p>
                                A product team meeting is a gathering of the
                                cross-functional product team — ideally including team
                                members from product, engineering, marketing, and
                                customer support.
                              </p>
                              <p>25 Jul 2023, 05:00 pm</p>
                              <div className="upcoming-info">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <p>Reminder</p>
                                    <div className="dropdown">
                                      <Link
                                        to="#"
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="ti ti-clock-edit me-1" />
                                        Reminder
                                        <i className="ti ti-chevron-down ms-1" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                        >
                                          Remainder
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                        >
                                          1 hr
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                        >
                                          10 hr
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <p>Task Priority</p>
                                    <div className="dropdown">
                                      <Link
                                        to="#"
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                                        High
                                        <i className="ti ti-chevron-down ms-1" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                        >
                                          <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                                          High
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                        >
                                          <i className="ti ti-square-rounded-filled me-1 text-success circle" />
                                          Low
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <p>Assigned to</p>
                                    <div className="dropdown">
                                      <Link
                                        to="#"
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/profiles/avatar-19.jpg"
                                          alt="img"
                                          className="avatar-xs"
                                        />
                                        John
                                        <i className="ti ti-chevron-down ms-1" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                        >
                                          <ImageWithBasePath
                                            src="assets/img/profiles/avatar-19.jpg"
                                            alt="img"
                                            className="avatar-xs"
                                          />
                                          John
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                        >
                                          <ImageWithBasePath
                                            src="assets/img/profiles/avatar-19.jpg"
                                            alt="img"
                                            className="avatar-xs"
                                          />
                                          Peter
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* /Activities */}
                    {/* Notes */}
                    <div className="tab-pane fade" id="notes">
                      <div className="view-header">
                        <h4>Notes</h4>
                        <ul>
                          <li>
                            <div className="form-sort">
                              <i className="ti ti-sort-ascending-2" />
                              <Select
                                className='select-details'
                                options={sortbydata}
                                placeholder="Sort By Date"
                            />
                            </div>
                          </li>
                          <li>
                            <Link
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#add_notes"
                              className="com-add"
                            >
                              <i className="ti ti-circle-plus me-1" />
                              Add New
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="notes-activity">
                        <div className="calls-box">
                          <div className="caller-info">
                            <div className="calls-user">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-19.jpg"
                                alt="img"
                              />
                              <div>
                                <h6>Darlee Robertson</h6>
                                <p>15 Sep 2023, 12:10 pm</p>
                              </div>
                            </div>
                            <div className="calls-action">
                              <div className="dropdown action-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-edit text-blue" />
                                    Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-trash text-danger" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h5>Notes added by Antony</h5>
                          <p>
                            A project review evaluates the success of an initiative
                            and identifies areas for improvement. It can also evaluate
                            a current project to determine whether it's on the right
                            track. Or, it can determine the success of a completed
                            project.{" "}
                          </p>
                          <ul>
                            <li>
                              <div className="note-download">
                                <div className="note-info">
                                  <span className="note-icon bg-secondary-success">
                                    <i className="ti ti-file-spreadsheet" />
                                  </span>
                                  <div>
                                    <h6>Project Specs.xls</h6>
                                    <p>365 KB</p>
                                  </div>
                                </div>
                                <Link to="#">
                                  <i className="ti ti-arrow-down" />
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="note-download">
                                <div className="note-info">
                                  <span className="note-icon">
                                    <ImageWithBasePath
                                      src="assets/img/media/media-35.jpg"
                                      alt="img"
                                    />
                                  </span>
                                  <div>
                                    <h6>090224.jpg</h6>
                                    <p>365 KB</p>
                                  </div>
                                </div>
                                <Link to="#">
                                  <i className="ti ti-arrow-down" />
                                </Link>
                              </div>
                            </li>
                          </ul>
                          <div className="notes-editor">
                            <div className="note-edit-wrap"style={{ display: addcomment ? "block" : "none"}}>
                              <div className="summernote">
                                Write a new comment, send your team notification by
                                typing @ followed by their name
                              </div>
                              <div className="text-end note-btns">
                                <Link
                                  to="#"
                                  className="btn btn-light add-cancel"
                                >
                                  Cancel
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-primary"
                                >
                                  Save
                                </Link>
                              </div>
                            </div>
                            <div className="text-end">
                              <Link to="#" className="add-comment" onClick={togglecomment}>
                                <i className="ti ti-square-plus me-1" />
                                Add Comment
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="calls-box">
                          <div className="caller-info">
                            <div className="calls-user">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-20.jpg"
                                alt="img"
                              />
                              <div>
                                <h6>Sharon Roy</h6>
                                <p>18 Sep 2023, 09:52 am</p>
                              </div>
                            </div>
                            <div className="calls-action">
                              <div className="dropdown action-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-edit text-blue" />
                                    Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-trash text-danger" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h5>Notes added by Antony</h5>
                          <p>
                            A project plan typically contains a list of the essential
                            elements of a project, such as stakeholders, scope,
                            timelines, estimated cost and communication methods. The
                            project manager typically lists the information based on
                            the assignment.
                          </p>
                          <ul>
                            <li>
                              <div className="note-download">
                                <div className="note-info">
                                  <span className="note-icon bg-secondary-success">
                                    <i className="ti ti-file-text" />
                                  </span>
                                  <div>
                                    <h6>Andrewpass.txt</h6>
                                    <p>365 KB</p>
                                  </div>
                                </div>
                                <Link to="#">
                                  <i className="ti ti-arrow-down" />
                                </Link>
                              </div>
                            </li>
                          </ul>
                          <div className="reply-box">
                            <p>
                              The best way to get a project done faster is to start
                              sooner. A goal without a timeline is just a dream.The
                              goal you set must be challenging. At the same time, it
                              should be realistic and attainable, not impossible to
                              reach.
                            </p>
                            <p>
                              Commented by <span className="text-purple">Aeron</span>{" "}
                              on 15 Sep 2023, 11:15 pm
                            </p>
                            <Link to="#" className="btn">
                              <i className="ti ti-arrow-back-up-double" />
                              Reply
                            </Link>
                          </div>
                          <div className="notes-editor">
                            <div className="note-edit-wrap" style={{ display: addcomment ? "block" : "none"}}>
                              <div className="summernote">
                                Write a new comment, send your team notification by
                                typing @ followed by their name
                              </div>
                              <div className="text-end note-btns">
                                <Link
                                  to="#"
                                  className="btn btn-light add-cancel"
                                >
                                  Cancel
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-primary"
                                >
                                  Save
                                </Link>
                              </div>
                            </div>
                            <div className="text-end">
                              <Link to="#" className="add-comment" onClick={togglecomment}>
                                <i className="ti ti-square-plus me-1" />
                                Add Comment
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="calls-box">
                          <div className="caller-info">
                            <div className="calls-user">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-21.jpg"
                                alt="img"
                              />
                              <div>
                                <h6>Vaughan</h6>
                                <p>20 Sep 2023, 10:26 pm</p>
                              </div>
                            </div>
                            <div className="calls-action">
                              <div className="dropdown action-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-edit text-blue" />
                                    Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-trash text-danger" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            Projects play a crucial role in the success of
                            organizations, and their importance cannot be overstated.
                            Whether it's launching a new product, improving an
                            existing
                          </p>
                          <div className="notes-editor">
                            <div className="note-edit-wrap" style={{ display: addcomment ? "block" : "none"}}>
                              <div className="summernote">
                                Write a new comment, send your team notification by
                                typing @ followed by their name
                              </div>
                              <div className="text-end note-btns">
                                <Link
                                  to="#"
                                  className="btn btn-light add-cancel"
                                >
                                  Cancel
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-primary"
                                >
                                  Save
                                </Link>
                              </div>
                            </div>
                            <div className="text-end">
                              <Link to="#" className="add-comment" onClick={togglecomment}>
                                <i className="ti ti-square-plus me-1" />
                                Add Comment
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Notes */}
                    {/* Calls */}
                    <div className="tab-pane fade" id="calls">
                      <div className="view-header">
                        <h4>Calls</h4>
                        <ul>
                          <li>
                            <Link
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#create_call"
                              className="com-add"
                            >
                              <i className="ti ti-circle-plus me-1" />
                              Add New
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="calls-activity">
                        <div className="calls-box">
                          <div className="caller-info">
                            <div className="calls-user">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-19.jpg"
                                alt="img"
                              />
                              <p>
                                <span>Darlee Robertson</span> logged a call on 23 Jul
                                2023, 10:00 pm
                              </p>
                            </div>
                            <div className="calls-action">
                              <div className="dropdown call-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Busy
                                  <i className="ti ti-chevron-down ms-2" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Busy
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    No Answer
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Unavailable
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Wrong Number
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Left Voice Message
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className="dropdown action-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-edit text-blue" />
                                    Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-trash text-danger" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            A project review evaluates the success of an initiative
                            and identifies areas for improvement. It can also evaluate
                            a current project to determine whether it's on the right
                            track. Or, it can determine the success of a completed
                            project.{" "}
                          </p>
                        </div>
                        <div className="calls-box">
                          <div className="caller-info">
                            <div className="calls-user">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-20.jpg"
                                alt="img"
                              />
                              <p>
                                <span>Sharon Roy</span> logged a call on 28 Jul 2023,
                                09:00 pm
                              </p>
                            </div>
                            <div className="calls-action">
                              <div className="dropdown call-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle bg-pending"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  No Answer
                                  <i className="ti ti-chevron-down ms-2" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Busy
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    No Answer
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Unavailable
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Wrong Number
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Left Voice Message
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className="dropdown action-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-edit text-blue" />
                                    Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-trash text-danger" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            A project plan typically contains a list of the essential
                            elements of a project, such as stakeholders, scope,
                            timelines, estimated cost and communication methods. The
                            project manager typically lists the information based on
                            the assignment.
                          </p>
                        </div>
                        <div className="calls-box">
                          <div className="caller-info">
                            <div className="calls-user">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-21.jpg"
                                alt="img"
                              />
                              <p>
                                <span>Vaughan</span> logged a call on 30 Jul 2023,
                                08:00 pm
                              </p>
                            </div>
                            <div className="calls-action">
                              <div className="dropdown call-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle bg-pending"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  No Answer
                                  <i className="ti ti-chevron-down ms-2" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Busy
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    No Answer
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Unavailable
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Wrong Number
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Left Voice Message
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className="dropdown action-drop">
                                <Link
                                  to="#"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-edit text-blue" />
                                    Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                  >
                                    <i className="ti ti-trash text-danger" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            Projects play a crucial role in the success of
                            organizations, and their importance cannot be overstated.
                            Whether it's launching a new product, improving an
                            existing
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* /Calls */}
                    {/* Files */}
                    <div className="tab-pane fade" id="files">
                      <div className="view-header">
                        <h4>Files</h4>
                      </div>
                      <div className="files-activity">
                        <div className="files-wrap">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="file-info">
                                <h4>Manage Documents</h4>
                                <p>
                                  Send customizable quotes, proposals and contracts to
                                  close deals faster.
                                </p>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <ul className="file-action">
                                <li>
                                  <Link
                                    to="#"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#new_file"
                                  >
                                    Create Document
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="files-wrap">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="file-info">
                                <h4>Collier-Turner Proposal</h4>
                                <p>
                                  Send customizable quotes, proposals and contracts to
                                  close deals faster.
                                </p>
                                <div className="file-user">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-21.jpg"
                                    alt="img"
                                  />
                                  <div>
                                    <p>
                                      <span>Owner</span> Vaughan
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <ul className="file-action">
                                <li>
                                  <span className="badge badge-tag badge-danger-light">
                                    Proposal
                                  </span>
                                </li>
                                <li>
                                  <span className="badge badge-tag bg-pending priority-badge">
                                    Draft
                                  </span>
                                </li>
                                <li>
                                  <div className="dropdown action-drop">
                                    <Link
                                      to="#"
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ti ti-dots-vertical" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-edit text-blue" />
                                        Edit
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-trash text-danger" />
                                        Delete
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-download text-info" />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="files-wrap">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="file-info">
                                <h4>Collier-Turner Proposal</h4>
                                <p>
                                  Send customizable quotes, proposals and contracts to
                                  close deals faster.
                                </p>
                                <div className="file-user">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-01.jpg"
                                    alt="img"
                                  />
                                  <div>
                                    <p>
                                      <span>Owner</span> Jessica
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <ul className="file-action">
                                <li>
                                  <span className="badge badge-tag badge-purple-light">
                                    Quote
                                  </span>
                                </li>
                                <li>
                                  <span className="badge bg-success priority-badge">
                                    Sent
                                  </span>
                                </li>
                                <li>
                                  <div className="dropdown action-drop">
                                    <Link
                                      to="#"
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ti ti-dots-vertical" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-edit text-blue" />
                                        Edit
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-trash text-danger" />
                                        Delete
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-download text-info" />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="files-wrap">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="file-info">
                                <h4>Collier-Turner Proposal</h4>
                                <p>
                                  Send customizable quotes, proposals and contracts to
                                  close deals faster.
                                </p>
                                <div className="file-user">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-22.jpg"
                                    alt="img"
                                  />
                                  <div>
                                    <p>
                                      <span>Owner</span> Vaughan
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <ul className="file-action">
                                <li>
                                  <span className="badge badge-tag badge-danger-light">
                                    Proposal
                                  </span>
                                </li>
                                <li>
                                  <span className="badge badge-tag bg-pending priority-badge">
                                    Draft
                                  </span>
                                </li>
                                <li>
                                  <div className="dropdown action-drop">
                                    <Link
                                      to="#"
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ti ti-dots-vertical" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-edit text-blue" />
                                        Edit
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-trash text-danger" />
                                        Delete
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-download text-info" />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Files */}
                    {/* Email */}
                    <div className="tab-pane fade" id="email">
                      <div className="view-header">
                        <h4>Email</h4>
                        <ul>
                          <li>
                            <Link
                              to="#"
                              className="com-add create-mail"
                              data-bs-toggle="tooltip"
                              data-bs-placement="left"
                              data-bs-custom-class="tooltip-dark"
                              data-bs-original-title="There are no email accounts configured, Please configured your email account in order to Send/ Create EMails"
                            >
                              <i className="ti ti-circle-plus me-1" />
                              Create Email
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="files-activity">
                        <div className="files-wrap">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="file-info">
                                <h4>Manage Emails</h4>
                                <p>
                                  You can send and reply to emails directly via this
                                  section.
                                </p>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <ul className="file-action">
                                <li>
                                  <Link
                                    to="#"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#create_email"
                                  >
                                    Connect Account
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="files-wrap">
                          <div className="email-header">
                            <div className="row">
                              <div className="col top-action-left">
                                <div className="float-start d-none d-sm-block">
                                  <input
                                    type="text"
                                    placeholder="Search Messages"
                                    className="form-control search-message"
                                  />
                                </div>
                              </div>
                              <div className="col-auto top-action-right">
                                <div className="text-end">
                                  <button
                                    type="button"
                                    title="Refresh"
                                    data-bs-toggle="tooltip"
                                    className="btn btn-white d-none d-md-inline-block"
                                  >
                                    <i className="fa-solid fa-rotate" />
                                  </button>
                                  <div className="btn-group">
                                    <Link to="#" className="btn btn-white">
                                      <i className="fa-solid fa-angle-left" />
                                    </Link>
                                    <Link to="#" className="btn btn-white">
                                      <i className="fa-solid fa-angle-right" />
                                    </Link>
                                  </div>
                                </div>
                                <div className="text-end">
                                  <span className="text-muted d-none d-md-inline-block">
                                    Showing 10 of 112{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="email-content">
                            <div className="table-responsive">
                              <table className="table table-inbox table-hover">
                                <thead>
                                  <tr>
                                    <th colSpan={6} className="ps-2">
                                      <input
                                        type="checkbox"
                                        className="checkbox-all"
                                      />
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    className="unread clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa fa-star starred " />
                                      </span>
                                    </td>
                                    <td className="name">John Doe</td>
                                    <td className="subject">
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td>
                                      <i className="fa-solid fa-paperclip" />
                                    </td>
                                    <td className="mail-date">13:14</td>
                                  </tr>
                                  <tr
                                    className="unread clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa-regular fa-star" />
                                      </span>
                                    </td>
                                    <td className="name">Envato Account</td>
                                    <td className="subject">
                                      Important account security update from Envato
                                    </td>
                                    <td />
                                    <td className="mail-date">8:42</td>
                                  </tr>
                                  <tr
                                    className="clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa-regular fa-star" />
                                      </span>
                                    </td>
                                    <td className="name">Twitter</td>
                                    <td className="subject">
                                      HRMS Bootstrap Admin Template
                                    </td>
                                    <td />
                                    <td className="mail-date">30 Nov</td>
                                  </tr>
                                  <tr
                                    className="unread clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa-regular fa-star" />
                                      </span>
                                    </td>
                                    <td className="name">Richard Parker</td>
                                    <td className="subject">
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className="mail-date">18 Sep</td>
                                  </tr>
                                  <tr
                                    className="clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa-regular fa-star" />
                                      </span>
                                    </td>
                                    <td className="name">John Smith</td>
                                    <td className="subject">
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className="mail-date">21 Aug</td>
                                  </tr>
                                  <tr
                                    className="clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa-regular fa-star" />
                                      </span>
                                    </td>
                                    <td className="name">me, Robert Smith (3)</td>
                                    <td className="subject">
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className="mail-date">1 Aug</td>
                                  </tr>
                                  <tr
                                    className="unread clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa-regular fa-star" />
                                      </span>
                                    </td>
                                    <td className="name">Codecanyon</td>
                                    <td className="subject">Welcome To Codecanyon</td>
                                    <td />
                                    <td className="mail-date">Jul 13</td>
                                  </tr>
                                  <tr
                                    className="clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa-regular fa-star" />
                                      </span>
                                    </td>
                                    <td className="name">Richard Miles</td>
                                    <td className="subject">
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td>
                                      <i className="fa-solid fa-paperclip" />
                                    </td>
                                    <td className="mail-date">May 14</td>
                                  </tr>
                                  <tr
                                    className="unread clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa-regular fa-star" />
                                      </span>
                                    </td>
                                    <td className="name">John Smith</td>
                                    <td className="subject">
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className="mail-date">11/11/16</td>
                                  </tr>
                                  <tr
                                    className="clickable-row"
                                    
                                  >
                                    <td>
                                      <input type="checkbox" className="checkmail" />
                                    </td>
                                    <td>
                                      <span className="mail-important">
                                        <i className="fa fa-star starred " />
                                      </span>
                                    </td>
                                    <td className="name">Mike Litorus</td>
                                    <td className="subject">
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className="mail-date">10/31/16</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Email */}
                  </div>
                </div>
                {/* /Tab Content */}
              </div>
              {/* /Leads Details */}
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
        <CreateLeads/>
        <AddFile/>
        <ContentAccount />
        <SuccessMail/>
        <Access/>
        <AddContent/>
      </>
      
    )
}

export default LeadsDetails
