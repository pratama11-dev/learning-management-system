# frozen_string_literal: true

module Api
  class ApplicationController < ::ApplicationController
    include ApplicationHelper
    include DateHelper
  end
end
